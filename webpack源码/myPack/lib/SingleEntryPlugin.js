class SingleEntryPlugin{
    constructor(context,entry,name) {
        this.context = context
        this.entry = entry
        this.name = name
    }
    apply(compiler){
        // 挂载entryOption钩子
        compiler.hooks.entryOption.tap("SingleEntryPlugin",
            (compilation, { normalModuleFactory }) => {
                console.log('SingleEntryPlugin--compilation~~~~')
            })
        // 挂载make钩子
        compiler.hooks.make.tapAsync('SingleEntryPlugin',(compilation, callback) => {
            const { entry, name, context } = this;
            console.log('SingleEntryPlugin--make~~~~')
            compilation.addEntry(context, entry, name, callback)
        })
    }
}

module.exports = SingleEntryPlugin
