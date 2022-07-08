---
title: 工作总结-项目优化
date: 2022-03-31 16:41:20
categories: 项目优化
tags: [WORK]
description: 工作总结
cover: https://s2.loli.net/2022/03/31/oTNACnmX6yefaLE.jpg
---

# 项目优化

公司的项目是一个vue的多页面应用，还比较大，在使用的过程中每次打开新的一个页面的时候，白屏时间就会很长

通过调试发现，每个页面打开都会去加载`chunk-vendors.js`和`chunk-common.js`

* `chunk-vendors.js`是*node-modules*下面的库集合
* `chunk-common.js`是通用chunk

因为项目比较大，*node-modules*下面的库比较多，`chunk-vendors.js`就会很大，所以再进入新页面的时候加载时间就会很长

而一些页面并没有依赖所有的库，导致加载了一些这个页面不需要的库

### 解决方案：删除默认 splitChunk 配置，抽离公共资源

删除默认的 splitChunk 配置，多入口会单独各自打包，但是公共资源不会抽取。

每个页面会单独各自打包，只需要将自己入口用到的依赖打包，而不需要加载等个`chunk-vendors.js`，加载速度就得到了提升

然后再将多页面的公共引用的再抽取出来

```js
module.export= {
    //...其他
    chainWebpack: config => {
        // 删除默认的splitChunk
        config.optimization.delete("splitChunks");
    },
    configureWebpack: config => {
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    common: {
                        //抽取所有入口页面都需要的公共chunk
                        name: "chunk-common",
                        chunks: "initial",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        };
    }
}
```

