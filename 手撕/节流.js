// 第一次不执行
function throttle(fn, time){
    let timer = null
    return function (...args){
        if(timer) return
        timer = setTimeout(() => {
            fn(...args)
            clearTimeout(timer)
            timer = null
        }, time)
    }
}

// 执行第一次
function throttle1(fn, time) {
    let timer = 0
    return function (...params){
        if(Date.now() - timer < time) {
            return
        }
        timer = Date.now()
        fn(...params)
    }
}

setInterval(
    throttle1(() => {
        console.log(1)
    }, 2000),
    1
)
