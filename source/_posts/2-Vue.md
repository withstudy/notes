---
title: vue源码分析-手写模拟简单源码(2)
date: 2020-02-24 12:31:20
categories: vue
tags: [vue]
description: Vue 利用 我们提供的数据 和 页面中 模板 生成了 一个新的 HTML 标签 ( node 元素 ),替换到了 页面中 放置模板的位置.
---

要解决一个问题: 使用 'xxx.yyy.zzz' 可以来访问某一个对象，就是用字符串路径来访问对象的成员。

```js
 function getValueByPath( obj, path ) {
      let paths = path.split( '.' ); // [ xxx, yyy, zzz ]
      let res = obj;
      let prop;
      while( prop = paths.shift() ) {
        res = res[ prop ];
      }
      return res;
    }
```

将上一篇的方法改进一下:

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
	let path = g.trim(); // 写在双花括号里面的 东西
           let value = getValueByPath( data, path );
            // 将 {{ xxxx }} 用这个 值替换
            return value;
          } );
```

来源: 腾讯课堂蒋坤公开课