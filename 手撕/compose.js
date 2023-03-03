function compose(fns){
    return function (args){
        return fns.reduceRight((pre,fn) => fn(pre), args)
    }
}

function fn1(p){
    return p + 1
}

function fn2(p){
    return p * 2
}

const c = compose([fn1,fn2])

console.log(c(1))