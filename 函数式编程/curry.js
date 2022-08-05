function curry(fn){
    return function currying(...args){
        if(args.length !== fn.length){
            return function (){
                return currying(...args.concat(Array.from(arguments)))
            }
        }
        return fn(...args)
    }
}

function fn(a,b,c){
    return a+b+c
}

const cFn = curry(fn)
console.log(cFn(1)(2,3))
console.log(cFn(1,2)(3))
console.log(cFn(1)(2)(3))