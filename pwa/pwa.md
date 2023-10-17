# PWA

PWA中文名称：渐进式应用

提升Web App的体验的方式，是使用 Web App Manifest、Service Worker、CSS3、ES6、HTTP2.0、Fetch API 等新的技术，让Web App 更接近普通APP的体验。

PWA 不是一种新的框架，而是一种新的理念，一种新的 Web 标准，一种新的 Web 开发方式。

特点：

* 渐进式
* 离线可访问
* 可安装

## Web App Manifest: 应用程序清单

可以让网站安装到设备的主屏幕，并自定义图标和启动画面。

### 使用方法

在项目根目录下创建一个 `manifest.json` 文件，并使用如下方式添加到html中

```html
<link rel="manifest" href="./manifest.json" />
```

### 常用配置

* `name`: 指定应用的名称
* `short_name`: 应用的短名称，用于启动画面和主屏幕
* `start_url`: 指定应用的启动地址
* `icons`: 用于指定启动画面和主屏幕的图标
* `backgroud_color`: 指定启动画面和主屏幕的背景色
* `theme_color`: 指定应用的主题颜色
* `display`: 指定应用的显示方式，可选值有 `standalone`, `fullscreen`, `minimal-ui`
  * `fullscreen`： 全屏显示，不显示状态栏
  * `standalone`： 独立显示，显示状态栏
  * `minimal-ui`： 独立显示，会有浏览器地址栏

[详细配置](https://developer.mozilla.org/en-US/docs/Web/Manifest)

## Service worker

Service worker 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用来采取适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API。

### 事件

* `install`：该事件触发时的标准行为是准备 service worker 用于使用，例如使用内建的 storage API 来创建缓存，并且放置应用离线时所需资源。
* `activate`：此事件触发的时间点通常是清理旧缓存以及其他与你的 service worker 的先前版本相关的东西的好时机。
* `fetch`：拦截请求

### 基本使用

* 注册Service worker

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA Demo</title>
    <link rel="manifest" href="./manifest.json" />
    <link rel="icon" href="./favicon.ico" />

    <script type="text/javascript">
        window.addEventListener('load', () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('./sw.js')
                    .then(function (registration) {
                        console.log('Service Worker 注册成功：', registration.scope);
                    })
                    .catch(function (error) {
                        console.log('Service Worker 注册失败：', error);
                    });
            }
        })
    </script>
</head>

<body>
    PWA Demo
</body>

</html>
```

* Service worker 实现

```js
const version ='v3'
self.addEventListener('install', async () => {
    console.log('install');
    const cache = await caches.open(version)
    await cache.addAll(['./' , './index.html', './favicon.ico', './manifest.json'])

    await self.skipWaiting()
})

self.addEventListener('activate', async () => {
    const cacheList = await caches.keys()
    console.log('activate');
    cacheList.map(async key => {
        if(key !== version) {
            await caches.delete(key)
        }
    })
    await self.clients.claim()
})

self.addEventListener('fetch', async (event) => {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(async response => {
            if(response) {
                return response
            }
            return await fetch(event.request)
        })
    )
})
```