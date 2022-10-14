# vue-router

## 一、hash模式
在`ur`l中`#`后面得部分就是`hash`

比如: `http://localhost:8080/#/login`
js获取`hash`
```js
const hash = location.hash
console.log(hash) //  #/login
```

可以通过`hashchange`事件监听`hash`的变化
```js
location.hash = '#/index' //改变hash
window.addEventListener('hashchange',function (e) {
    console.log(e)
})
```

**hash的改变浏览器不会发送请求**

## 二、history模式
域名后面的路径就是history模式下的路由

比如: `http://localhost:8080/#/login`
js获取路由
```js
const route = location.pathname
console.log(route) //  /login
```

可以通过`popstate`事件监听路由的变化
```js
window.addEventListener('popstate',function (e) {
    console.log(e)
})
```

可以改变`location.pathname`来切换路由，但是会导致浏览器刷新发送请求

而使用`history`对象的`pushState`与`replaceState`来切换不会发送请求
```js
history.pushState('<data>','<title>','<path>')
history.replaceState('<data>','<title>','<path>')
```

> 但是使用history模式手动刷新浏览器还是会发送请求
> 
> 可以部署在nginx的时候，在配置文件对应的location项的最后一行添加:
> 
> `try_files $uri $uri/ /index.html; `；
