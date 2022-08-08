const MyPromise = require('./MyPromise')

// 多个then
// const promise = new MyPromise((resolve,reject) => {
//     setTimeout(resolve,2000,'success')
// })
//
// promise.then(value => {
//     console.log(value,'成功回调1')
// })
//
// promise.then(value => {
//     console.log(value,'成功回调2')
// })
//
// promise.then(value => {
//     console.log(value,'成功回调3')
// })

//链式调用
// const promise = new MyPromise((resolve,reject) => {
//     resolve('new')
// })
//
// promise.then(value => {
//     return promise
// }).then(value => {
//     console.log(value)
// })

// then中返回then返回的promise
// const promise = new MyPromise((resolve,reject) => {
//     resolve('new')
// })
//
// let promiseThen = promise.then(value => {
//     console.log(value)
//     return promiseThen
// })
//
// promiseThen.then(null,reason => {
//     console.log(reason)
// })

// const promise = new MyPromise((resolve,reject) => {
//     setTimeout(resolve,2000,'promise')
// })
// .then((value) => {
//     console.log(value)
// })

const p1 = function (){
    return new MyPromise((resolve,reject) => {
        setTimeout(resolve,2000,'p1')
    })
}

const p2 = function (){
    return new MyPromise((resolve,reject) => {
        reject('p2')
    })
}

// MyPromise.all(['1','2',p1(),p2(),'3']).then(value => console.log(value),reason => console.log(reason))
//
// MyPromise.race([p1(),p2()]).then(value => console.log('success',value),reason => console.log('fail',reason))

// p1().catch(reason => console.log(reason))

p2().finally( () => {
    console.log('finally')
    return p1()
}).then(null,value => console.log('then',value))
