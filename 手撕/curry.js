function curry(fn, args = []){
     const len = fn.length
    return function (...params){
        args = args.concat(params)
        if(args.length >= len){
            return fn.apply(this, args)
        } else {
            return curry.call(this, fn, args)
        }
    }
}

function curry2(fn){
    const len = fn.length
    let args = []
    return function f(...params){
        args = args.concat(params)
        if(args.length >= len){
            const res = fn.apply(this,args)
            args.splice(0)
            return res
        }else {
            return f
        }
    }
}
function fn(a,b,c){
    console.log(a + b +c)
}
const fn1 = curry(fn)
const fn2 = curry2(fn)

fn1(1)(2)(3)
fn2(1)(2)(3)
fn2(1,2)(3)

