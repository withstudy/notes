---
title: WebComponent
date: 2021-11-08 10:25:20
categories:  component
tags: [component]
description: 学习总结
cover: https://i.loli.net/2021/11/08/LoPrsA7Y8XRwSk6.jpg
---

## WebComponent

在了解WebComponent是什么之前，先了解一下组件.

### 一、组件

组件已经是老生常谈得话题了，相信大家都用过了，毕竟React、Vue等框架等会使用到。

在vue中，组件提高了我们得代码复用率，让我们把公共得页面提取出来，并且通过prop等方式将数据传递给组件。还有solt插槽，都是为了更好的封装组件。

但是不同的框架的组件化实现方式不一样，这就导致在学习了新的框架，就要采用新的组件化方式。

为了让Web组件模型得到统一， [W3C](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3.org%2F) 定义的浏览器标准组成，使得开发者可以构建出浏览器原生支持的组件。它就是WebComponent。

### 二、使用方式

#### 1、定义模板

首先可以使用template标签来定义一个HTML模板

```html
  <template id="custom-component">
    <style>
      h1{
        color: red;
      }
      p{
        color: blue;
      }
    </style>
    <solt name="text"></solt>
    <p>component-text</p>
  </template>
```

在web Component中同样支持solt插槽，在使用的时候就可以传入其他元素

在web Component中使用style可以定义组件元素的样式，但是是全局应用，后面会讲样式组件化

#### 2、定义组件

可以通过创建一个类继承HTMLElement来定义一个组件

```js
 class CustomComponent extends HTMLElement {
      constructor(){
        super();
         //获取HTML模板的id
        const customComponent = document.getElementById('custom-component');
        //将标签里面的内容插入到模板里
        this.appendChild(customComponent.content.cloneNode(true));
      }
    }
```

把本来DOM树中的一部分封装起来，并且隐藏起来，隐藏起来的树概念为Shadow Tree。把它理解成DOM上一棵特殊的子树，称之为shadow tree或影子树。也是树，但是很特殊，树里面也是DOM，就像我们上面用document.createElement创建的DOM一样。

```js
class CustomComponent extends HTMLElement {
      constructor(){
        super();
        //创建shadow
        const shadow = this.attachShadow({mode:'closed'})
        //获取HTML模板的id
        const customComponent = document.getElementById('custom-component');
        //将标签里面的内容插入到shadow
        shadow.appendChild(customComponent.content.cloneNode(true));
      }
    }
```

shadow可以防止样式应用到全局，但是使用shadow之后不能使用solt

然后使用window.customElements.define自定义个标签

```js
window.customElements.define('custom-component',CustomComponent)
```

#### 3、使用组件

```html
<custom-component>
    <p solt="text">solt-text</p>
  </custom-component>
```

