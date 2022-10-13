const { Tapable, SyncHook } = require('tapable')
const async = require('neo-async')
const ejs = require('ejs')
const Chunk = require('./Chunk')
const NormalModuleFactory = require('./NormalModuleFactory')
const Parser = require('./Parser')
const path = require('path')

const normalModuleFactory = new NormalModuleFactory()
const parser = new Parser()

class Compilation extends Tapable{
    constructor(compiler) {
        super()
        this.hooks = {
            succeedModule: new SyncHook(['module']),
            seal: new SyncHook(),
            beforeChunks: new SyncHook(),
            afterChunks: new SyncHook()
        }
        this.compiler = compiler
        this.context = compiler.context
        this.options = compiler.options
        // 让 compilation 具备文件的读写能力
        this.inputFileSystem = compiler.inputFileSystem
        this.outputFileSystem = compiler.outputFileSystem
        this.entries = []  // 存入所有入口模块的数组
        this.modules = [] // 存放所有模块的数据
        this.chunks = []  // 存放当前次打包过程中所产出的 chunk
        this.assets = []
        this.files = []
    }

    addEntry(context,entry,name,callback){
        // this.hooks.addEntry.call(entry, name);

        this._addModuleChain(
            context,
            entry,
            name,
            (err, module) => {
                return callback(err, module);
            }
        );
    }

    _addModuleChain(context,entry,name,callback){
        this.createModule({
            parser,
            name: name,
            context: context,
            rawRequest: entry,
            resource: path.posix.join(context, entry),
            moduleId: './' + path.posix.relative(context, path.posix.join(context, entry))
        }, (entryModule) => {
            this.entries.push(entryModule)
        }, callback)
    }

    createModule(data, doAddEntry, callback) {
        let module = normalModuleFactory.create(data)

        const afterBuild = (err, module) => {
            // 在 afterBuild 当中我们就需要判断一下，当前次module 加载完成之后是否需要处理依赖加载
            if (module.dependencies.length > 0) {
                // 当前逻辑就表示module 有需要依赖加载的模块，因此我们可以再单独定义一个方法来实现
                this.processDependencies(module, (err) => {
                    callback(err, module)
                })
            } else {
                callback(err, module)
            }
        }

        this.buildModule(module, afterBuild)

        // 当我们完成了本次的 build 操作之后将 module 进行保存
        doAddEntry && doAddEntry(module)
        this.modules.push(module)
    }

    buildModule(module, callback) {
        module.build(this, (err) => {
            // 如果代码走到这里就意味着当前 Module 的编译完成了
            this.hooks.succeedModule.call(module)
            callback(err,module)
        })
    }

    processDependencies(module, callback) {
        // 01 当前的函数核心功能就是实现一个被依赖模块的递归加载
        // 02 加载模块的思想都是创建一个模块，然后想办法将被加载模块的内容拿进来?
        // 03 当前我们不知道 module 需要依赖几个模块， 此时我们需要想办法让所有的被依赖的模块都加载完成之后再执行 callback？【 neo-async 】
        let dependencies = module.dependencies

        async.forEach(dependencies, (dependency, done) => {
            this.createModule({
                parser,
                name: dependency.name,
                context: dependency.context,
                rawRequest: dependency.rawRequest,
                moduleId: dependency.moduleId,
                resource: dependency.resource
            }, null, done)
        }, callback)
    }

    seal(callback) {
        this.hooks.seal.call()
        this.hooks.beforeChunks.call()

        // 01 当前所有的入口模块都被存放在了 compilation 对象的 entries 数组里
        // 02 所谓封装 chunk 指的就是依据某个入口，然后找到它的所有依赖，将它们的源代码放在一起，之后再做合并

        for (const entryModule of this.entries) {
            // 核心： 创建模块加载已有模块的内容，同时记录模块信息
            const chunk = new Chunk(entryModule)

            // 保存 chunk 信息
            this.chunks.push(chunk)

            // 给 chunk 属性赋值
            chunk.modules = this.modules.filter(module => module.name === chunk.name)

        }

        // chunk 流程梳理之后就进入到 chunk 代码处理环节（模板文件 + 模块中的源代码==》chunk.js)
        this.hooks.afterChunks.call(this.chunks)

        // 生成代码内容
        this.createChunkAssets()

        callback()
    }

    createChunkAssets() {
        for (let i = 0; i < this.chunks.length; i++) {
            const chunk = this.chunks[i]
            const fileName = chunk.name + '.js'
            chunk.files.push(fileName)

            // 01 获取模板文件的路径
            let tempPath = path.posix.join(__dirname, 'temp/main.ejs')
            // 02 读取模块文件中的内容
            let tempCode = this.inputFileSystem.readFileSync(tempPath, 'utf8')
            // 03 获取渲染函数
            let tempRender = ejs.compile(tempCode)
            // 04 按ejs的语法渲染数据
            let source = tempRender({
                entryModuleId: chunk.entryModule.moduleId,
                modules: chunk.modules
            })

            // 输出文件
            this.emitAssets(fileName, source)

        }
    }

    emitAssets(fileName, source) {
        this.assets[fileName] = source
        this.files.push(fileName)
    }
}

module.exports = Compilation
