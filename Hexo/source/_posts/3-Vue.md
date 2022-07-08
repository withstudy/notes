---
title: vue源码分析-手写模拟简单源码(3)
date: 2020-02-24 12:36:18
categories: vue
tags: [vue]
description: Vue 利用 我们提供的数据 和 页面中 模板 生成了 一个新的 HTML 标签 ( node 元素 ),替换到了 页面中 放置模板的位置.
cover: https://i.loli.net/2021/09/15/iqmJedx4ahWXZSb.jpg
---

### 函数科里化

概念:
1. 科里化: 一个函数原本有多个参数, 之传入**一个**参数, 生成一个新函数, 由新函数接收剩下的参数来运行得到结构.
2. 偏函数: 一个函数原本有多个参数, 之传入**一部分**参数, 生成一个新函数, 由新函数接收剩下的参数来运行得到结构.
3. 高阶函数: 一个函数**参数是一个函数**, 该函数对参数这个函数进行加工, 得到一个函数, 这个加工用的函数就是高阶函数.
为什么要使用科里化? 为了提升性能. 使用科里化可以缓存一部分能力.
使用两个案例来说明:
1. 判断元素
2. 虚拟 DOM 的 render 方法
1. 判断元素:

Vue 本质上是使用 HTML 的字符串作为模板的, 将字符串的 模板 转换为 AST, 再转换为 VNode.

- 模板 -> AST
- AST -> VNode
- VNode -> DOM

最消耗性能是字符串解析 ( 模板 -> AST )

在 Vue 中每一个标签可以是真正的 HTML 标签, 也可以是自定义组件, 问怎么区分???
在 Vue 源码中其实将所有可以用的 HTML 标签已经存起来了.
假设这里是考虑几个标签:

```js
let tags = 'div,p,a,img,ul,li'.split(',');
```

需要一个函数, 判断一个标签名是否为 内置的 标签

```js
function isHTMLTag( tagName ) {
  tagName = tagName.toLowerCase();
  if ( tags.indexOf( tagName ) > -1 ) return true;
  return false;
}
```

2. 虚拟 DOM 的 render 方法

思考: vue 项目 *模板 转换为 抽象语法树* 需要执行几次??? 

- 页面一开始加载需要渲染
- 每一个属性 ( 响应式 ) 数据在发生变化的时候 要渲染
- watch, computed 等等

以前写的代码 每次需要渲染的时候, 模板就会被解析一次 ( 注意, 这里我们简化了解析方法 )

render 的作用是将 虚拟 DOM 转换为 真正的 DOM 加到页面中

- 虚拟 DOM 可以降级理解为 AST
- 一个项目运行的时候 模板是不会变 的, 就表示 AST 是不会变的

我们可以将代码进行优化, 将 虚拟 DOM 缓存起来, 生成一个函数, 函数只需要传入数据 就可以得到 真正的 DOM

```js
JGVue.prototype.createRenderFn = function () {
      let ast = getVNode( this._template );
      // Vue: 将 AST + data => VNode
      // 我们: 带有坑的 VNode + data => 含有数据的 VNode
      return function render () {//返回一个方法
        // 将 带有 坑的 VNode 转换为 待数据的 VNode
        let _tmp = combine( ast, this._data );
        return _tmp;
      }
    }
```

在真正的 Vue 中使用了 二次提交的 设计结构

1. 在 页面中 的 DOM 和 虚拟 DOM 是一一对应的关系
2. 先 有 AST 和 数据 生成 VNode ( 新, render )
3. 将 就的 VNode 和 新的 VNode 比较 ( diff ), 更新 ( update )

参考资料:

- [函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
- [维基百科](https://zh.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C%E5%8C%96)

来源: 腾讯课堂蒋坤公开课