const EntryOptionPlugin = require('./EntryOptionPlugin')

class WebpackOptionsApply{
    process(options,compiler){
        new EntryOptionPlugin().apply(compiler);
        // 触发entryOption狗子
        compiler.hooks.entryOption.call(options.context, options.entry);
    }
}

module.exports = WebpackOptionsApply
