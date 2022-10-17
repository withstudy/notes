class Vue{
    constructor(options) {
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = document.getElementById(options.el)
        this._proxyData(this.$data)
        new Observer(this.$data)
        new Compiler(this)
    }

    _proxyData(data){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get(){
                    return data[key]
                },
                set(newVal){
                    data[key] = newVal
                }
            })
        })
    }
}
