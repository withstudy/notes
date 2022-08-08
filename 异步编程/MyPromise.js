const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise{
    constructor(execution) {
        try {
            execution(this.resolve,this.reject)
        } catch (e){
            this.reject(e)
        }
    }

    //状态
    status = PENDING
    //成功 返回值
    value = undefined
    //失败 返回值
    reason = undefined
    //成功回调
    successCallbacks = []
    //失败回调
    failCallbacks = []

    resolve = (value) => {
        //只有pending状态，才能改变状态
        if(this.status !== PENDING){
            return
        }

        this.status = FULFILLED
        this.value = value
        //执行成功回调
        while (this.successCallbacks.length){
            this.successCallbacks.shift()()
        }
    }

    reject = (reason) => {
        if(this.status !== PENDING){
            return
        }

        this.status = REJECTED
        this.reason = reason
        //执行失败回调
        while (this.failCallbacks.length){
            this.failCallbacks.shift()()
        }
    }

    then(successCallback,failCallback){
        //保证then空参与可以链式调用
        successCallback = successCallback ? successCallback : (value => value)
        failCallback = failCallback ? failCallback : (reason => {throw reason})
        //then的链式调用
       const promise = new MyPromise((resolve,reject) => {
           if(this.status === FULFILLED){
               //异步保证promise创建成功
               setTimeout(() => {
                  try {
                      const value= successCallback(this.value)
                      promiseResolve(promise,value,resolve,reject)
                  } catch (e){
                      reject(e)
                  }
               })
           } else if(this.status === REJECTED){
               setTimeout(() => {
                   try {
                       const value= failCallback(this.reason)
                       promiseResolve(promise,value,resolve,reject)
                   } catch (e){
                       reject(e)
                   }
               })
           } else {
               //状态还未改变（异步），先保存回调
               this.successCallbacks.push(() => {
                   try {
                       const value= successCallback(this.value)
                       promiseResolve(promise,value,resolve,reject)
                   } catch (e){
                       reject(e)
                   }
               })
               this.failCallbacks.push(() => {
                   try {
                       const value= failCallback(this.reason)
                       promiseResolve(promise,value,resolve,reject)
                   } catch (e){
                       reject(e)
                   }
               })
           }
       })

        return promise
    }

    catch(failCallback){
        return this.then(undefined,failCallback)
    }

    finally(callback){
        //return then让链式调用可以继续
        return this.then(
            value => MyPromise.resolve(callback()).then(value => value),
                reason => MyPromise.resolve(callback()).then(reason => {throw reason})
        )
    }

    static all(promises){
        const res = []
        let index = 0
        return new MyPromise((resolve,reject) => {
            function addValue(key,data){
                //保证返回结果得顺序
                res[key] = data
                index++
                //所有执行完毕
                if(index === promises.length){
                    resolve(res)
                }
            }
            for(let i=0;i<promises.length;i++){
                const promise = promises[i]
                if(promise instanceof MyPromise){
                    promise.then(value => addValue(i,value),reason => reject(reason))
                }else{
                    //普通值直接返回
                    addValue(i,promise)
                }
            }
        })
    }

    static race(promises){
        return new MyPromise((resolve,reject) => {
            promises.map(promise => {
                promise.then(value => resolve(value),reason => reject(reason))
            })
        })
    }

    static resolve(value){
        if(value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    static reject(reason){
        if (reason instanceof MyPromise) return reason
        return new MyPromise((resolve,reject) => reject(reason))
    }
}

function promiseResolve(promise,value,resolve,reject){
    //then中的返回结果不能等于then返回的promise对象
    if(promise === value){
        return reject(new TypeError('then can not return then promise'))
    }
    //如果返回的是promise
    //根据promise状态返回promise的对应的结果
    if(value instanceof MyPromise){
        value.then(value => resolve(value), reason => reject(reason))
    }else{
        resolve(value)
    }
}

module.exports = MyPromise
