---
title: vue源码分析-手写模拟简单源码(1)
date: 2020-02-24 11:31:20
categories: vue
tags: [vue]
description: Vue 利用 我们提供的数据 和 页面中 模板 生成了 一个新的 HTML 标签 ( node 元素 ),替换到了 页面中 放置模板的位置.
---

### 使用步骤:

1. 编写 页面 模板 
   1. 直接在 HTML 标签中写 标签
   2. 使用 template
   3. 使用 单文件 `( <template /> )`
2. 创建 Vue 的实例
   - 在 Vue 的构造函数中提供: data, methods, computed, watcher, props, ...
3. 将 Vue 挂载到 页面中 ( mount )

```js
<!-- 写模板 -->
  <div id="root">
    <p>{{name}}</p>
    <p>{{message}}</p>
  </div>
  <script>
    // 第二步 创建 实例
    let app = new Vue( {
      el: '#root',
      data: {
        name: '张三'
        , message: '是一个男人'
      }
    } );
    // 第三步是挂载: 这种用法的挂载在 vue.js 中帮我们实现了
```

### Vue 的执行流程

1. 获得模板: 模板中有 "坑"
2. 利用 Vue 构造函数中所提供的数据来 "填坑", 得到可以在页面中显示的 "标签了"
3. 将标签替换页面中原来有坑的标签

Vue 利用 我们提供的数据 和 页面中 模板 生成了 一个新的 HTML 标签 ( node 元素 ),
替换到了 页面中 放置模板的位置.

### 简单的模板渲染

步骤:

1. 拿到模板
2. 拿到数据 ( data )
3. 将数据与模板结合, 得到 的是 HTML 元素 ( DOM 元素 )

```js
function compiler( template, data ) {
      let childNodes = template.childNodes; // 取出子元素
      for ( let i = 0; i < childNodes.length; i++ ) {
        let type = childNodes[ i ].nodeType; // 1 元素, 3 文本节点
        if ( type === 3 ) {
          // 文本节点, 可以判断里面是否有 需要 插值
          let txt = childNodes[ i ].nodeValue; // 该属性只有文本节点才有意义
          // 有没有双花括号??? 
          txt = txt.replace( rkuohao, function ( _, g ) { // replace 使用正则匹配一次 函数就会被调用一次
                                                    // 函数的 第 0 个参数 表示匹配到的内容
                                                    // 函数的 第 n 个参数 表示正则中的 第 n 组
            let key = g.trim(); // 写在双花括号里面的 东西
            let value = data[ key ];
            // 将 {{ xxxx }} 用这个 值替换
            return value;
          } );
          // 注意:  txt 现在和 DOM 元素是没有关系
          childNodes[ i ].nodeValue = txt;
        } 
        else if ( type === 1 ) {
          // 元素, 考虑它有没有子元素, 是否需要将其子元素进行 判断是否要插值
          compiler( childNodes[ i ], data );
        }
      }
    }
```

4. 放到页面中

``` js
root.parentNode.replaceChild( generateNode, root );
```

来源: 腾讯课堂蒋坤公开课