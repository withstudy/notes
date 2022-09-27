# 模块化

模块化，在js中指将一个复杂的js文件，按照不同的功能拆分为多个js文件单独维护

## 一. 演进过程

### 1. 文件划分方式

最开始把一个js文件当作一个模块，每个文件实现不同的功能，在HTML中通过script标签引入
```js
// a.js
const a = 'a msg~'
// b.js
console.log(a)
// index.html
// ...省略
```

缺点：
* 污染全局作用域：因为在HTML中通过script引入的js文件中创建的变量都在window对象上
* 变量命名冲突：如果文件中有两个同名的变量会产生冲突
* 依赖关系不明确：引入的js的执行顺序取决于script的顺序，如果加载顺序不对，执行时
  可能会报错
  
### 2. 命名空间方式

每一个js文件为一个模块，输入一个全局对象，需要导出的属性与方法都挂在到对象上
```js
// a.js
moduleA = {
    a:'a msg~',
    b:'b msg~'
}
// b.js
moduleB = {
    b: function (){console.log(module.a)}
}
```

缺点：
* 依赖关系不明确
* 私密性不好：有可能你只想让别人调用某个模块的一个方法，但是这样的方式，会把模块内的所有变量
和方法都暴露出去
  
### 3. IIFE（立即执行函数）
通过立即执行函数，利用闭包的机制，可以将变量私有化，只需要返回想要暴露出去的变量

而且利用函数接收参数的特性，可以把依赖通过参数传入，依赖关系更加明确

```js
// a.js
(function (){
    const a = 'a msg~'
    const b = 'b msg~'
    window.moduleA = {
        a
    }
})();
// b.js
(function (a){
    window.moduleB = {
        b: function (){console.log(a)}
    }
})(moduleA)
```

## 二. 标准规范

### 1. CommonJs

CommonJs是node出现之后第一个标准的模块化规范

使用`module.exports` 或 `exports` 导出，`require`导入

特点：

* 模块同步加载，加载完成才向下执行
* 模块在首次执行后就会缓存，再次加载只返回缓存结果
* CommonJS输出是值的拷贝（浅拷贝）
* require支持表达式

>  CommonJS只适合在服务端使用，不能在浏览器中使用

### 2. AMD
AMD采用异步的方式加载模块

模块定义：define(<模块名>，<模块依赖>，<模块函数>)

模块引用: require(<模块依赖>，<模块函数>)
### 3. CMD

### 4. ESModules

#### 特点

* `export`命令和`import`命令可以出现在模块的任何位置，只要处于模块顶层就可以

  **`export default`后可以是任何变量**

  **`export {}`并不是表示导出一个对象，而是一种格式**

  **同理，`import {a,b} from '模块'`并不是将导出模块结构，而是结构如此**

* **ESM导出的是值的引用，模块内的改变会影响引用的改变**
```js
// a.js
let a = 1
setTimeout(() => {
  a++
},1000)
exports {a}
// b.js
import {a} from 'a.js'
console.log(a) // 1
setTimeout(() => {
    console.log(a) //2
},2000)
```
* **导出的值是不能被改变的**
* 自动采用严格模式
* ESM的script标签会延迟执行（defer）
* 会先导入再执行代码