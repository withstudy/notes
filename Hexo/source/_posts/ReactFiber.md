---
title: React Fiber 简单理解
date: 2021-11-08 10:19:20
categories:  react
tags: [react]
description: 学习总结
cover: https://i.loli.net/2021/11/08/5FyRd9cuxGIzXYt.jpg
---

### React Fiber 简单理解

React Fiber解决了页面卡顿的问题，React 在diff 新旧vdom的时候，是对比的整个vdom，如果应用比较大的时候，就会存在卡顿。不像vue，vue的响应式，将更改确定在组件层级，diff不会涉及整个vdom。

主要原因还是因为浏览器和js单线程的关系，都知道浏览器在执行js脚本的时候会阻塞页面的解析和渲染，React 在没有Fiber的时候，就相当于对浏览器说：‘先执行我的脚本，再做其他的’，有了Fiber之后，就相当于对浏览器说：‘等你有空了再执行我的脚本’。

* requestIdleCallback API

这是谷歌浏览器提供的一个api，主要作用就是告诉浏览器，让它在空闲的时候执行我们传入的callback

但是这个api有兼容性问题，React并没用采用，而是自己重新实现了一个，它利用[`MessageChannel`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMessageChannel) 模拟将回调延迟到'绘制操作'之后执行

并且react 将任务分成不同的优先级：

* `Immediate`(-1) - 这个优先级的任务会同步执行, 或者说要马上执行且不能中断

* `UserBlocking`(250ms) 这些任务一般是用户交互的结果, 需要即时得到反馈

* `Normal` (5s) 应对哪些不需要立即感受到的任务，例如网络请求

* `Low` (10s) 这些任务可以放后，但是最终应该得到执行. 例如分析通知

* `Idle` (没有超时时间) 一些没有必要做的任务 (e.g. 比如隐藏的内容), 可能会被饿死

react 使用链表来模拟函数调用栈，为了更好的知道中断位置来恢复执行

react将渲染分成两个阶段：

* 协调阶段：可以认为是 Diff 阶段, **这个阶段可以被中断**, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等,
* 提交阶段： 将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。**这个阶段必须同步执行，不能被打断**.
