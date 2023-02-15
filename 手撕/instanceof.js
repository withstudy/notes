function _instanceof(obj,fn){
    if(!(obj && ['object','function'].includes(typeof obj))) return false

    let proto = Object.getPrototypeOf(obj)

    while (proto){
        if(proto === fn.prototype){
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}


let Fn = function () { }
let p1 = new Fn()

console.log(_instanceof({}, Object)) // true
console.log(_instanceof(p1, Fn)) // true
console.log(_instanceof({}, Fn)) // false
console.log(_instanceof(null, Fn)) // false
console.log(_instanceof(1, Fn)) // false
