
const cache = new WeakMap()
function deepClone(obj){
    if(typeof obj !== 'object') return obj
    if(cache.has(obj)) return cache.get(obj)
    let newObj = Array.isArray(obj) ? [] : {}
    for (let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepClone(obj[key])
        }
    }
    cache.set(obj,newObj)
    return newObj
}

const obj = {
    a: 1,
    b: [1,2,3,4],
    c: {
        d: 44,
        e: [5,6,7,8],
        f: {}
    }
}

obj.c.f.g = obj.c

const newObj = deepClone(obj)
newObj.a += 10
newObj.b.push(66)
newObj.c.d += 10
newObj.c.e.push(66)

console.log(obj,newObj)
