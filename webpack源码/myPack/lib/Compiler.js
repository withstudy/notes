const {
    Tapable,
    AsyncSeriesHook,
    SyncHook,
    AsyncParallelHook,
    SyncBailHook
} = require('tapable')

const path = require('path')
const mkdirp = require('mkdirp')

const Compilation = require('./Compilation')
const NormalModuleFactory = require('./NormalModuleFactory')
const Stats = require('./Stats')

class Compiler extends Tapable{
    constructor(context) {
        super();
        // 注册hooks
        this.hooks = {
            done: new AsyncSeriesHook(["stats"]),
            beforeRun: new AsyncSeriesHook(["compiler"]),
            run: new AsyncSeriesHook(["compiler"]),

            thisCompilation: new SyncHook(["compilation", "params"]),
            compilation: new SyncHook(["compilation", "params"]),
            normalModuleFactory: new SyncHook(["normalModuleFactory"]),
            contextModuleFactory: new SyncHook(["contextModulefactory"]),

            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            make: new AsyncParallelHook(["compilation"]),
            afterCompile: new AsyncSeriesHook(["compilation"]),

            entryOption: new SyncBailHook(["context", "entry"]),
            emit: new AsyncSeriesHook(['compilation'])
        };
        this.context = context
    }

    emitAssets(compilation, callback) {
        // 当前需要做的核心： 01 创建dist  02 在目录创建完成之后执行文件的写操作

        // 01 定义一个工具方法用于执行文件的生成操作
        const emitFlies = (err) => {
            const assets = compilation.assets
            let outputPath = this.options.output.path

            for (let file in assets) {
                let source = assets[file]
                let targetPath = path.posix.join(outputPath, file)
                this.outputFileSystem.writeFileSync(targetPath, source, 'utf8')
            }

            callback(err)
        }

        // 创建目录之后启动文件写入
        this.hooks.emit.callAsync(compilation, (err) => {
            mkdirp.sync(this.options.output.path)
            emitFlies()
        })

    }

    run(callback){
        const finalCallback = function (err, stats) {
            callback(err, stats)
        }

        const onCompiled = (err, compilation) => {
            // 最终在这里将处理好的 chunk 写入到指定的文件然后输出至 dist
            this.emitAssets(compilation, (err) => {
                let stats = new Stats(compilation)
                finalCallback(err, stats)
            })
        }
        // 触发beforeRun钩子
        this.hooks.beforeRun.callAsync(this, err => {
            this.hooks.run.callAsync(this, err => {
                this.compile(onCompiled);
            });
        });
    }
    createCompilation() {
        return new Compilation(this);
    }

    newCompilationParams(){
        const params = {
            normalModuleFactory: new NormalModuleFactory()
        };
        return params;
    }
    newCompilation(params) {
        // 创建compilation
        const compilation = this.createCompilation();

        // 触发thisCompilation钩子
        this.hooks.thisCompilation.call(compilation, params);
        // 触发compilation
        this.hooks.compilation.call(compilation, params);

        return compilation;
    }

    compile(callback){
        const params = this.newCompilationParams()

        // 触发beforeCompile钩子
        this.hooks.beforeCompile.callAsync(params, err => {
            this.hooks.compile.call(params);

            const compilation = this.newCompilation(params);
            //触发make钩子
            this.hooks.make.callAsync(compilation, (err) => {
                // 开始处理 chunk
                compilation.seal((err) => {
                    this.hooks.afterCompile.callAsync(compilation, (err) => {
                        callback(err, compilation)
                    })
                })
            })
        })
    }
}

module.exports = Compiler
