// 执行最后一次
function debounce(fn, time) {
    let timer = null,flag = false
    return function (...params){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...params)
            clearTimeout(timer)
        },time)
    }
}

// 执行第一次
function debounce1(fn, time) {
    let timer = 0
    return function (...params){
        if(Date.now() - timer < time) {
            timer = Date.now()
            return
        }
        timer = Date.now()
        fn(...params)
    }
}
function fn(i){
    console.log(i)
}

const dFn = debounce(fn,100)
const dFn1 = debounce1(fn,100)
for(let i = 0; i < 10000; i ++){
    dFn(i)
    dFn1(i)
}

// 0
// 9999

