class Observer{
    constructor(data) {
        this.walk(data)
    }
    walk(data){
        if(!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            this.observeProperty(data,key,data[key])
        })
    }

    observeProperty(obj,key,val){
        const that = this

        const dep = new Dep()

        //深层响应式
        this.walk(val)
        Object.defineProperty(obj,key,{
            configurable:true,
            enumerable:true,
            get(){
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newVal){
                if(newVal === val)return
                val = newVal
                // 重新赋值对象时,响应式
                that.walk(newVal)

                // 更新依赖
                dep.notify()
            }
        })
    }
}
