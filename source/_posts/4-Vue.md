---
title: vue源码分析-手写模拟简单源码(4)
date: 2020-02-24 19:36:18
categories: vue
tags: [vue]
description: Vue 利用 我们提供的数据 和 页面中 模板 生成了 一个新的 HTML 标签 ( node 元素 ),替换到了 页面中 放置模板的位置.
cover: https://i.loli.net/2021/09/15/iqmJedx4ahWXZSb.jpg
---

### 响应式原理

- 我们在使用 Vue 时候, 赋值属性获得属性都是直接使用的 Vue 实例
- 我们在设计属性值的时候, 页面的数据更新

```js
Object.defineProperty( 对象, '设置什么属性名', {
  writeable
  configurable
  enumerable:  控制属性是否可枚举, 是不是可以被 for-in 取出来
  set() {}  赋值触发
  get() {}  取值触发
} )
```

```js
// 简化后的版本
function defineReactive( target, key, value, enumerable ) {
  // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
  Object.defineProperty( target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get () {
      console.log( `读取 o 的 ${key} 属性` ); // 额外
      return value;
    },
    set ( newVal ) {
      console.log( `设置 o 的 ${key} 属性为: ${newVal}` ); // 额外
      value = newVal;
    }
  } )
}
```

实际开发中对象一般是有多级

```js
let o = {
  list: [
    {  }
  ],
  ads: [
    { }
  ],
  user: {

  }
}
```
对于对象可以使用 递归来响应式化, 但是数组我们也需要处理

- push
- pop
- shift
- unshift
- reverse
- sort
- splice

要做什么事情呢?

1. 在改变数组的数据的时候, 要发出通知
   - Vue 2 中的缺陷, 数组发生变化, 设置 length 没法通知 ( Vue 3 中使用 Proxy 语法 ES6 的语法解决了这个问题 )
2. 加入的元素应该变成响应式的

技巧: 如果一个函数已经定义了, 但是我们需要扩展其功能, 我们一般的处理办法:

1. 使用一个临时的函数名存储函数
2. 重新定义原来的函数
3. 定义扩展的功能
4. 调用临时的那个函数

例子:

```js
 function func() {
      console.log( '原始的功能' );
    }
    // 1
    let _tmpFn = func;
    // 2
    func = function () {
      // 4
      _tmpFn();
      // 3
      console.log( '新的扩展的功能' );
    };
    func(); // 1. 打印出 原始的功能
            // 2. 打印出 新的扩展功能
```

扩展数组的 push 和 pop 怎么处理呢???

- 直接修改 prototype **不行**
- 修改要进行响应式化的数组的原型 ( __proto__ )

```
// 继承关系: arr -> Array.prototype -> Object.prototype -> ...
// 继承关系: arr -> 改写的方法 -> Array.prototype -> Object.prototype -> ...
```
代码:

```js
 // 响应式化的部分
    let ARRAY_METHOD = ['push','pop','shift','unshift','reverse','sort','splice'];
    let array_methods = Object.create( Array.prototype );
    ARRAY_METHOD.forEach( method => {
      array_methods[ method ] = function () {
        // 调用原来的方法
        console.log( '调用的是拦截的 ' + method + ' 方法' );
        // 将数据进行响应式化
        for( let i = 0; i < arguments.length; i++ ) {
          reactify( arguments[ i ] );
        } 
        let res = Array.prototype[ method ].apply( this, arguments );
        // Array.prototype[ method ].call( this, ...arguments ); // 类比
        return res;
      }
    } );

    // 简化后的版本 
    function defineReactive( target, key, value, enumerable ) {
      // 折中处理后, this 就是 Vue 实例
      let that = this;
      // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
      if ( typeof value === 'object' && value != null && !Array.isArray( value ) ) {
        // 是非数组的引用类型
        reactify( value ); // 递归
      }

      Object.defineProperty( target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get () {
          console.log( `读取 ${key} 属性` ); // 额外
          return value;
        },
        set ( newVal ) {
          console.log( `设置 ${key} 属性为: ${newVal}` ); // 额外

          value = newVal;

          // 模板刷新 ( 这现在是假的, 只是演示 )
          // vue 实例??? watcher 就不会有这个问题
          that.mountComponent(); // 修改数据的时候, 模板要刷新

        }
      } );
    }
    // 将对象 o 响应式化
    function reactify( o, vm ) {
      let keys = Object.keys( o );

      for ( let i = 0; i < keys.length; i++ ) {
        let key = keys[ i ]; // 属性名
        let value = o[ key ];
        if ( Array.isArray( value ) ) {
          // 数组
          value.__proto__ = array_methods; // 数组就响应式了
          for ( let j = 0; j < value.length; j++ ) {
            reactify( value[ j ], vm ); // 递归
          }
        } else {
          // 对象或值类型
          defineReactive.call( vm, o, key, value, true );
        }
      }
    }
```
来源: 腾讯课堂蒋坤公开课


