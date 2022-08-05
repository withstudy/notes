function compose(...fns){
    return function (value){
        return fns.reverse().reduce((pre,fn) => {
            return fn(pre)
        },value)
    }
}

const upper = s => s.toUpperCase()
const first = arr => arr[0]
const reverse = arr => arr.reverse()

const cFn = compose(upper,first,reverse)

console.log(cFn(['aaa','bbb','ccc']))