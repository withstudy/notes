class LRU{
    constructor(size) {
        this.size = size
        this.keys = []
        this.cache = new Map()
    }

    hasKey(key) {
        return this.keys.includes(key)
    }

    put(key,value){
        if(this.hasKey(key)){
            // 如果key已经存在,删除重新push
            this.keys = this.keys.filter(k => k !== key)
        }else if(this.keys.length === this.size){
            // keys长度等于size时,删除最少使用key和cache
            this.cache.delete(this.keys.shift())
        }
        // 保存put的key和value
        this.cache.set(key,value)
        this.keys.push(key)
        return this.cache
    }

    get(key) {
        if(this.hasKey(key)){
            // 如果存在key,更新keys顺序
            this.keys = this.keys.filter(k => k !== key)
            this.keys.push(key)
            return this.cache.get(key)
        }
        return -1
    }
}

const lru = new LRU(3)
console.log(lru.get('1')) // -1
console.log(lru.put("1", 1)) // { '1' => 1 }
console.log(lru.put("2", 2)) // { '1' => 1, '2' => 2 }
console.log(lru.put("3", 3)) // { '1' => 1, '2' => 2, '3' => 3 }
console.log(lru.get('1')) // 1
console.log(lru.put("4", 5)) // { '1' => 1, '3' => 3, '4' => 5 }
console.log(lru.get('2')) // -1
