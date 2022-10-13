const Compiler = require('./Compiler')
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const WebpackOptionsApply = require('./WebpackOptionsApply')

const webpack = (options)=>{
    //创建Compiler对象
    const compiler = new Compiler(options.context)
    compiler.options = options
    // 通过NodeEnvironmentPlugin给Compiler对象添加文件读写能力
    new NodeEnvironmentPlugin().apply(compiler);
    // 挂载配置得plugins
    if(options.plugins && Array.isArray(options.plugins)){
        options.plugins.map(plugin => {
            plugin.apply(compiler)
        })
    }

    //挂载各种钩子
    new WebpackOptionsApply().process(options, compiler);

    return compiler
}

module.exports = webpack
