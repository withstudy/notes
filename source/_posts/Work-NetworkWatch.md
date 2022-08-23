---
title: 工作总结-网络监控
date: 2022-08-23 09:43:20
categories: 项目优化
tags: [WORK]
description: 工作总结
cover: https://s2.loli.net/2022/03/31/oTNACnmX6yefaLE.jpg
---
# 网络监控

## 一. 浏览器api
1. 监控网络连接状态

使用HTML5新增的`offline`和`onlnie`事件
```js
window.addEventListener('offline', '<fn>') //离线状态下执行
window.addEventListener('online', '<fn>') //在线状态下执行
```
2. 监控网络速度

使用`navigator.connection`可以拿到网络的一些信息
```text
{
  effectiveType: '4g',
  rtt: 200, 
  downlink: 10, 
  saveData: false, 
  onchange: ƒ
}
```
其中：
* **effectiveType**: 网络类型 比如: 4g、3g、2g等
* **rtt**: 估算的往返时间
* **downlink**: 网络下行速度
* **saveDate**: 打开/请求数据保护模式
* **onchange**: 设置`navigator.connection`改变之后的回调

使用方法:
```js
const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection

const fn = function () {
    // do something
}
connection.onchange = fn
```

> 在项目中使用上面的方法之后，测试发现效果并不是很好。比如：
> 
> * 电脑断开网络连接没有触发离线（offline）事件（电脑端谷歌浏览器（版本 104.0.5112.102（正式版本）））
> * 通过软件控制电脑网速不会触发`navigator.connection`的onchange

## 二.请求轮询

使用创建`img`标签加载图片，通过判断加载成功与失败、加载时长来判断网络状态

具体实现：

```js
const networkState = ref('off')
const networkOnCallback = []
const networkOffCallback = []

let timer = null
let imgDom = null
let imgLoadTime = 8
let waitTime = ref(2000)
const onNetworkState = function () {
    //清空定时器和dom，防止内存泄露
    clearTimeout(timer)
    imgDom = null
    timer = setTimeout(function () {
        //请求发起时间
        const imgLoadTimeStart = new Date().getTime()
        imgDom = document.createElement('img')
        imgDom.setAttribute(
            'src',
            `/logo-lg.png?date=${new Date().getTime()}`
        )
        imgDom.onload = () => {
            //加载成功时长
            const imgLoadSuccessTime = new Date().getTime()
            // 加载过程总时长
            const loadTime = imgLoadSuccessTime - imgLoadTimeStart
            // 加载时长超过10秒 提示网络差
            if (loadTime > 10000) {
                ElMessage(
                    { message: '网络状态不佳', type: 'error' },
                    appContext
                )
                // 网络不佳，减少轮询间隔时长
                if (waitTime.value > 2 * 1000) {
                    waitTime.value -= 500
                }
            } else {
                //请求成功，增加轮询间隔时长
                if (waitTime.value < 10 * 1000) {
                    waitTime.value += 200
                }
            }

            //执行回调，防止多次执行
            if (networkState.value === 'off') {
                networkOnCallback.map(cb => {
                    cb && cb()
                })
            }

            networkState.value = 'on'

            //递归轮询
            onNetworkState()
        }
        imgDom.onerror = err => {
            // 执行断网回调
            if (networkState.value === 'on') {
                networkOffCallback.map(cb => {
                    cb && cb()
                })
            }
            // 缩短轮询间隔时长
            waitTime.value = 2000
            networkState.value = 'off'
            // 递归轮询
            onNetworkState()
        }
    }, waitTime.value)
}
onNetworkState()

const removerCallback = function (type = 'on', callback) {
    if (type === 'on') {
        const onIndex = networkOnCallback.findIndex(cb => {
            return cb === callback
        })
        onIndex >= 0 && networkOnCallback.splice(onIndex, 1)
    } else {
        const offIndex = networkOffCallback.findIndex(cb => {
            return cb === callback
        })
        offIndex >= 0 && networkOffCallback.splice(offIndex, 1)
    }
}

const addCallback = function (type = 'on', callback) {
    if (type === 'on') {
        networkOnCallback.push(callback)
    } else {
        networkOffCallback.push(callback)
    }
}

```

