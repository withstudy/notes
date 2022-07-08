---
title: 网络：HTTP缓存
date: 2021-11-24 11:06:32
categories: 网络
tags: [网络]
description: 学习总结
cover: https://i.loli.net/2021/11/23/fa31uAzw7gLdn9P.jpg
---

# 网络：HTTP缓存

缓存是为了可以加快资源获取速度，提升用户体验，减少网络传输，缓解服务端的压力

HTTP缓存分为`强缓存`、`协商缓存`，由不同的头部字段来实现

## 一、强缓存

实现强缓存由`Expires`、`Cache-Control`两个头部字段实现，如果不可以使用缓存就直接发送请求或进行协商缓存

* **Expires**

  `Expires`是HTTP/1.0提出的用来实现缓存的字段，是由服务器返回的资源过期日期，是一个绝对时间

  浏览器在发送请求的时候，会与系统的日期时间与其对比，如果小于它就使用缓存，否则就发起请求获取资源

  **缺点：因为是一个绝对的日期时间，所以可以通过修改系统时间来决定是否使用缓存**

* **Cache-Control**

  `Cache-Control`是HTTP/1.1提出的，通过设置不同的属性值来实现不同缓存方式

  **如果Expires和Cache-Control同时存在，后者的优先级会更高**



常用的属性值：

* `max-age`：单位是秒，缓存时间计算的方式是距离发起的时间的秒数，超过间隔的秒数缓存失效
* `no-cache`：不使用强缓存，需要与服务器验证缓存是否新鲜
* `no-store`：禁止使用缓存（包括协商缓存），每次都向服务器请求最新的资源
* `private`：专用于个人的缓存，中间代理、CDN 等不能缓存此响应
* `public`：响应可以被中间代理、CDN 等缓存
* `must-revalidate`：在缓存过期前可以使用，过期后必须向服务器验证
* `s-max-age`：与`max-age`类似，决定中间代理、CDN能够缓存的秒数

*** 可以设置多个属性值配合使用，用`;`分隔**



## 二、协商缓存

如果没有命中强缓存，就会进入协商缓存

协商缓存不管资源有没有过期都会发送一次请求验证资源有没有过期

如果没有过期返回状态码`304`，可以使用缓存，如果过期了会返回新的资源

协商缓存相关的请求头部字段有`Last-Modified`，`Etag`，`If-Modified-Since`，`If-None-Modified`

* **Last-Modified / If-Modified-Since**

  `Last-Modified`是由服务器返回的，代表资源最后修改的时间

  `If-Modified-Since`用于向服务器请求资源时，将原来的`Last-Modifeid`与服务端保存的资源最后修改时间进行对比，如果是一样的服务器就返回`304`，代表可以继续使用缓存，如果不一样，服务器返回新的资源以及新的最后修改时间`Last-Modifeid`返回给客户端，客户端继续将新的`Last-Modified`保存

  **缺点：**

    * **有时候资源更新频率是秒级的，Last-Modified/If-Modified-Since 会错误地返回 304**

    * **如果文件被修改了，但是内容没有任何变化的时候，Last-Modified/If-Modified-Since 会错误地返回 304 ，上面的例子就说明了这个问题**

* **Etag / If-None-Modified**

  `Etag`和`Last-Modified`处理类似

  `Etag`由服务器通过资源生成的唯一标识符，如果资源被修改，那么这个标识符就会重新计算

  `If-None-Modified`用于向服务器请求资源时，将原来的`Etag`比较，一样就返回`304`，继续使用缓存，否则就返回新的资源以及新的`Etag`



![1.png](https://i.loli.net/2021/11/24/xAwuOXG1EFifl4g.png)



参考文章：

[前端缓存最佳实践](https://juejin.cn/post/6844903737538920462)