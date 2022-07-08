---
title: 微前端:micro-app
date: 2022-03-16 16:27:27
categories: 微前端
tags: [微前端]
description: 学习总结
cover: https://s2.loli.net/2022/03/16/okgAipbt8jS5rs2.jpg
---

# 微前端：京东的MicroApp

[文档](https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/start)

微前端在前端领域中是炙手可热的话题，将一个应用的不同模块单独建立应用，使用不同的框架生态来实现，再整合成一个应用

在实际业务中，我们也遇到同样的问题，并且在不同的业务场景下尝试了各种解决方案，如iframe、npm包、微前端框架，并对各种方案的优劣进行了对比。

**iframe**：在所有微前端方案中，iframe是最稳定的、上手难度最低的，但它有一些无法解决的问题，例如性能低、通信复杂、双滚动条、弹窗无法全局覆盖，它的成长性不高，只适合简单的页面渲染。

**npm包**：将子应用封装成npm包，通过组件的方式引入，在性能和兼容性上是最优的方案，但却有一个致命的问题就是版本更新，每次版本发布需要通知接入方同步更新，管理非常困难。

**微前端框架**：流行的微前端框架有single-spa和qiankun，它们将维护成本和功能上达到一种平衡，是目前实现微前端备受推崇的方案。
由于iframe和npm包存在问题理论上无法解决，在最初我们采用qiankun作为解决方案，qiankun是在single-spa基础上进行了封装，提供了js沙箱、样式隔离、预加载等功能，并且与技术栈无关，可以兼容不同的框架。

而**micro-app**利用了WebComponent,自定义元素`micro-app`,在生命周期函数connectedCallback监听元素被渲染，加载子应用的html并转换为DOM结构，递归查询所有js和css等静态资源并加载，设置元素隔离，拦截所有动态创建的script、link等标签，提取标签内容。将加载的js经过插件系统处理后放入沙箱中运行，对css资源进行样式隔离，最后将格式化后的元素放入micro-app中，最终将micro-app元素渲染为一个微前端的子应用
![](https://s2.loli.net/2022/03/16/yer1OwGfJo2du3C.png)
[参考文章](https://juejin.cn/post/6989435430559023117)