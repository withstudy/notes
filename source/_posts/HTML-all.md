---
title: HTML-总结
date: 2022-03-30 10:32:20
categories: HTML
tags: [HTML]
description: 学习总结
cover: https://s2.loli.net/2022/03/30/6Nw1IhFGdrvc2ti.jpg
---

# HTML总结

### 一、语义化

**语义化是指根据内容的结构化，选择合适的标签。** 也就是用正确的标签做正确的事。

优点：
* 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效的信息，有利于SEO
* 对开发者友好，增强了代码的可读性，结构更加清晰，便于维护

常见的与语义化标签
* **header** ：头部
* **nav** ：导航栏
* **main** ：主要区域
* **section** ：区块
* **article** ：主要内容
* **aside** ：侧边栏
* **footer** ：底部

### 二、DOCTYPE（文档类型）

DOCTYPE是HTML5中的一种**标准通用标记语言**的文档类型声明，它的目的是为了告诉浏览器应该以什么样的文档类型定义来解析文档，
不同的渲染模式会影响浏览器对CSS代码甚至JavaScript脚本的解析。它必须声明在HTMl文档的第一行。

浏览器渲染⻚⾯的两种模式（可通过document.compatMode获取，⽐如，语雀官⽹的⽂档类型是 CSS1Compat）：
* CSS1Compat：标准模式（Strick mode），默认模式，浏览器使⽤W3C的标准解析渲染⻚⾯。在 标准模式中，浏览器以其⽀持的最⾼标准呈现⻚⾯。 
  
* BackCompat：怪异模式(混杂模式)(Quick mode)，浏览器使⽤⾃⼰的怪异模式解析渲染⻚⾯。在 怪异模式中，⻚⾯以⼀种⽐较宽松的向后兼容的⽅式显示。

### 三、meta标签

`meta` 标签由 `name` 和 `content` 属性定义，⽤来**描述⽹⻚⽂档的属性**，⽐如⽹⻚的作者，⽹⻚描 述，关键词等，除了HTTP标准固定了⼀些 name 作为⼤家使⽤的共识，开发者还可以⾃定义name。

常用的meta标签:
* `charset`：用来描述HTMl文档的编码类型
```html
<meta charset="utf-8">
```
* `keywords`：⻚⾯关键词
```html
<meta name="keywords" content="关键词" /> 
```
* ` description`：⻚⾯描述
```html
<meta name="description" content="⻚⾯描述内容" /> 
```
* ` refresh`⻚⾯重定向和刷新
```html
<meta http-equiv="refresh" content="0;url=" /> 
```
* `viewport`：适配移动端，可以控制视⼝的⼤⼩和⽐例
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum- scale=1"> 
```
其中， content 参数有以下⼏种： 
> width viewport ：宽度(数值/device-width)
  
> height viewport ：⾼度(数值/device-height) 
  
> initial-scale ：初始缩放⽐例 

> maximum-scale ：最⼤缩放⽐例 

> minimum-scale ：最⼩缩放⽐例 

> user-scalable ：是否允许⽤户缩放(yes/no）

### 四、HTML5更新

* （1）新增语义化标签：nav、header、footer、aside、section、article 
* （2）⾳频、视频标签：audio、video 
* （3）数据存储：localStorage、sessionStorage 
* （4）canvas（画布）、Geolocation（地理定位）、websocket（通信协议） 
* （5）input标签新增属性：placeholder、autocomplete、autofocus、required 
* （6）history API：go、forward、back、pushstate

### 五、行内/块级标签
* ⾏内标签有： `a` `b` `span` `img` `input` `select` `strong` ； 
* 块级标签有： `div` `ul` `ol` `li` `dl` `dt` `dd` `h1` `h2` `h3` `h4` `h5` `h6` `p` ；
* 空标签有：`br` `hr`  `img`  `input`  `link`  `meta` ；

行内标签与块级标签的区别：
* 块级标签独占一行，并且会自动换行，而行内标签会在一条水平线上排列
* 行内标签不能设置宽高，margin、padding上下无效
* 块级标签可以包含任何标签，而行内标签只能包含文本或行内标签

### 六、渐进增强和优雅降级

1. 渐进增强（progressive enhancement）：主要是针对低版本的浏览器进⾏⻚⾯重构，保证基本 的功能情况下，再针对⾼级浏览器进⾏效果、交互等⽅⾯的改进和追加功能，以达到更好的⽤户体验。 
2. 优雅降级 graceful degradation： ⼀开始就构建完整的功能，然后再针对低版本的浏览器进⾏兼 容。

两者区别： 

* 优雅降级是从复杂的现状开始的，并试图减少⽤户体验的供给；⽽渐进增强是从⼀个⾮常基础的， 能够起作⽤的版本开始的，并在此基础上不断扩充，以适应未来环境的需要； 
* 降级（功能衰竭）意味着往回看，⽽渐进增强则意味着往前看，同时保证其根基处于安全地带。