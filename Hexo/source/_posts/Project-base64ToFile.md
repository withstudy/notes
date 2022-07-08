---
title: 将图片base64 转换为 图片文件
date: 2022-01-12 10:32:20
categories: 项目
tags: [项目]
description: 工作总结
cover: https://s2.loli.net/2022/03/16/gtfW7Ah85npcvGz.jpg
---

# 将图片base64 转换为 图片文件

项目中遇到一个需求，图片上传，但是这个图片是base64编码的，需要转换为图片文件对象才能上传
```js
        // 将图片base64 转换为 图片文件
        // dataurl 图片的base64编码
        // 例：Request URL: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB....
        function dataURLtoFile(dataurl){
            let arr = dataurl.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];//图片类型 png
            const filename = Date.parse(new Date()) + '.png';
            let bstr = window.atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
```

* **window.atob**

atob(encodedStr) 方法用于解码使用 base-64 编码的字符串,base-64 编码使用方法是 btoa()

* **Uint8Array**

Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

* **File**

***new File(bits, name[, options])***

> bits (required) ArrayBuffer，ArrayBufferView，Blob，或者 Array[string] — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。。
> 
> name [String] (required) 文件名称，或者文件路径.
> 
> options [Object] (optional) 选项对象，包含文件的可选属性。可用的选项如下：
> * type: string, 表示将要放到文件中的内容的MIME类型。默认值为 '' 。
> * lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。

```js
            // 创建FormData
            const params = new FormData();
            const imgFile = this.dataURLtoFile(this.imgSrc);
            params.append('fileImport',imgFile);
            _uploadImg(params);//调用接口
```