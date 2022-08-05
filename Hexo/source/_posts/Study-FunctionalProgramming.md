---
title: 函数式编程
date: 2022-08-05 17:27:27
categories: Javascript
tags: [Javascript]
description: 学习总结
cover: https://s2.loli.net/2022/08/05/JPaEXoMlbQzASxy.jpg
---

# 函数式编程


函数式编程（FP）是一种编程范式，抽象事物与事物之间的**联系**，描述数据之间的映射
```js
function add(a,b){
    return a+b
}
const sum=add(1,2)
```

## 特性

### 1. 纯函数
* 函数式编程中函数必须是**纯函数**
> 纯函数：相同的输入始终会得到相同的输出，并且是没有**副作用**的
> 
> 优点：
> 1. 可缓存：相同输入得到相同输出，可以在执行之后把结果缓存，之后同样的输入就可以直接返回缓存
> 
> 2. 可测试：每一个纯函数都有自己的入参和返回结果
> 
> 3. 并行处理：纯函数不依赖公共数据，可以多线程并行执行，不会冲突
> 
> 副作用：函数依赖外部的数据就会产生副作用，所有的外部交互都有可能产生副作用
> 
> 缺点：
> 
> 1. 降低函数的通用性
> 
> 2. 给程序带来不确定性

* 函数式编程只需要关注数据和目标，而不需要关注过程

例子：
```js
const arr = [1,2,3,4]
const nArr = arr.filter(a => a > 2)
//[3,4]
```
数组函数**filter**过滤掉不符合条件的元素

而你不需要关注具体的过滤过程，你只需要关注需要过滤的数据，以及过滤之后想要的结果

↑例子：给你一个arr的数组，我只想要大于二的元素

* 函数式编程不会保留函数计算中间的结果（无状态），可以把一个函数的结果传递给另外一个函数作为参数

### 2. 柯里化（currying）

一个函数接受多个参数，可以先接受一部分参数，然后返回一个函数接收剩下的参数，最后返回结果

特点：

1. 缓存：函数传递一部分参数之后，得到了一个记住之前参数的函数
2. 灵活：将多元函数变为一元函数，可以组合函数产生更强大的功能

柯里化原理
```js
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
```

例子：
```js
function fn(a,b,c){
    return a+b+c
}

const cFn = curry(fn)
console.log(cFn(1)(2,3))
//6
console.log(cFn(1,2)(3))
//6
console.log(cFn(1)(2)(3))
//6
```

### 3. 组合（compose）

将细粒度的多个函数组合成一个新的函数

多个函数间执行是有顺序的，**默认从右往左**，并且前一个函数的返回结果作为后一个函数的参数

就像管道一样，依次使用函数对数据进行处理，最后得到结果

组合原理

```js
function compose(...fns){
    return function (value){
        return fns.reverse().reduce((pre,fn) => {
            return fn(pre)
        },value)
    }
}
```

例子：
```js
//获取数组中最后一个单词变为大写
const upper = s => s.toUpperCase()
const first = arr => arr[0]
const reverse = arr => arr.reverse()

const cFn = compose(upper,first,reverse)

console.log(cFn(['aaa','bbb','ccc']))
//CCC
```

### 4. 函子（Functor）

函子是一个特殊的容器（包含值与值之间的变形关系（函数）），通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运
行一个函数对值进行处理(变形关系)

例子
```js
// 一个容器，包裹一个值 
class Container {
    // of 静态方法，可以省略 new 关键字创建对象 
    static of(value) {
        return new Container(value)
    }

    constructor(value) {
        this._value = value
    }// map 方法，传入变形关系，将容器里的每一个值映射到另一个容器 
    map(fn) {
        return Container.of(fn(this._value))
    }
}
```
> 函子就是一个实现了 map 契约的对象,里面封装了一个值，map 方法传递一个处理值的函数（纯函数），由这
个函数来对值进行处理，并且返回一个包含新值的盒子（函子）

1) **MayBe 函子**
   
MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）
   
2) **Either 函子**
   
异常会让函数变的不纯，Either 函子可以用来做异常处理,类似于 if...else...的处理
   
3) **IO 函子**
   
IO 函子中的 _value 是一个函数，这里是把函数作为值来处理,把不纯的动作存储到 _value 中，延迟执行这个不纯的操作(惰性执行)，包装当前的操
   作纯,把不纯的操作交给调用者来处理
   
4) **Task 异步执行**
   
5) **Pointed 函子**

Pointed 函子是实现了 of 静态方法的函子 ,of 方法是为了避免使用 new 来创建对象

6) **Monad（单子）**

Monad 函子是可以变扁的 Pointed 函子，IO(IO(x))

一个函子如果具有 join 和 of 两个方法并遵守一些定律就是一个 Monad