class EventEmitter{
    constructor() {
        this.events = new Map()
    }

    on(event,callback){
        if(this.events.has(event)){
            // 已经存在该事件，将回调加入事件列表中
            this.events.get(event).add(callback)
        }else{
            // 没有存在该事件，新建一个Set存入callback
            this.events.set(event,new Set([callback]))
        }
    }

    emit(event,...params){
        const callbacks = this.events.get(event) || new Set()
        // 遍历对应事件列表，依次执行
        Array.from(callbacks).map(cb => cb(...params))
    }

    remove(event,callback){
        if(callback){
            // 删除指定事件回调
            this.events.get(event).delete(callback)
        } else {
            // 删除事件
            this.events.delete(event)
        }
    }

    once(event,callback){
        // 只执行一次，从对应事件列表删除
        const that = this
        const cb = function (...params) {
            callback(...params)
            that.remove(event,cb)
        }
        this.on(event,cb)
    }
}

const e = new EventEmitter()
e.on('msg',msg => console.log('111'+msg) )
e.on('msg',msg => console.log('2221'+msg) )
e.emit('msg','666') // 111666  2221666
console.log('------once------')
e.once('once',() => console.log('once',this))
e.emit('once') //once
console.log(e.events.get('once').size) // 0
console.log('------remove------')
function msg(){
    console.log('function msg')
}
e.on('msg',msg)
e.emit('msg')// 111undefined 2221undefined function msg


console.log('+++++')
e.remove('msg',msg)
e.emit('msg') // 111undefined   2221undefined

e.remove('msg')
console.log(e.events.get('msg')) //undefined

