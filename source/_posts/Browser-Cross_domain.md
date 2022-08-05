---
title: 浏览器：跨域
date: 2021-11-27 15:26:10
categories: 浏览器
tags: [浏览器]
description: 学习总结
cover: https://i.loli.net/2021/12/02/mBz6KwcxZdS7q5G.jpg
---

# 浏览器：跨域

受浏览器的`同源策略`影响，不能向不同于自己的域名发起请求，也就是跨域

## 同源策略

同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

**同源策略限制内容有：**

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM 节点
- AJAX 请求发送后，结果被浏览器拦截了

但是有三个标签是允许跨域加载资源：

- `<img src=XXX>`
- `<link href=XXX>`
- `<script src=XXX>`

什么情况会发生跨域：

* 同一域名，不同端口
* 同一域名，不同协议
* 域名和域名对应相同ip 
* 主域相同，子域不同
* 不同域名

注意两点：

* **在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”**
* **跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了**。

## 跨域解决方案

### 一、JSONP

**利用 `<script>` 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以。**

JSONP优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。**缺点是仅支持get方法具有局限性,不安全可能会遭受XSS攻击。**

流程：

1. 声明一个回调函数，其函数名(如show)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的data)。

2. 创建一个`<script>`标签，把那个跨域的API数据接口地址，赋值给script的src,还要在这个地址中向服务器传递该函数名（可以通过问号传参:?callback=show）。

3. 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串,例如：传递进去的函数名是show，它准备好的数据是`show('我不爱你')`。

4. 最后服务器把准备的数据通过HTTP协议返回给客户端，客户端再调用执行之前声明的回调函数（show），对返回的数据进行操作。

**手撕JSONP方法**：

```js
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[callback] = function(data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback } // wd=b&callback=show
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}

jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})
```

### 二、CORS

**CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现**。

浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。

服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为**简单请求**和**复杂请求**。

1. **简单请求**

   只要同时满足以下两大条件，就属于简单请求

   条件1：使用下列方法之一：

   - GET
   - HEAD
   - POST

   条件2：Content-Type 的值仅限于下列三者之一：

   - text/plain
   - multipart/form-data
   - application/x-www-form-urlencoded

   对于简单请求来说，浏览器会直接发出CORS请求，就是在这个请求的头信息中，自动添加一个 `Origin` 字段来说明本次请求的来源（协议 + 域名 + 端口），而后服务器会根据这个值，决定是否同意这次请求

2. **复杂请求**

   不符合以上条件的请求就肯定是复杂请求了。 复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。

   "预检"请求头，一般会包括如下几个：

   * **Access-Control-Allow-Origin**：**允许跨域的来源**，必需项，它表示服务端允许跨域访问的地址来源，你可以写入需要跨域的域名，也可以设为`*`，表示同意任意跨源请求

     注意，将此字段设置为 `*` 是很不安全的，建议指定来源，并且设置为 `*` 号后，游览器将不会发送 `Cookie`，即使你的 `XHR` 设置了 `withCredentials`，也不会发送 `Cookie`

   * **Access-Control-Allow-Methods**：**允许跨域请求的方法**，必需项，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法

   * **Access-Control-Allow-Headers**：**允许的请求头字段**，必需项，它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在预检中请求的字段

   * **Access-Control-Allow-Credentials**：**允许发送Cookie**，该字段可选，它的值是一个布尔值，表示是否允许发送Cookie，默认情况下，Cookie不包括在CORS请求之中

     如果想要发送Cookie，客户端在发送Ajax是也需要配置

     ```js
     xhr = new XMLHttpRequest()
     xhr.withCredentials = true
     ```

   * **Access-Control-Max-Age**：**本次预检请求的有效期**，该字段可选，用来指定本次预检请求的有效期，单位为秒

### 三、服务器代理

利用服务器发送请求不存在跨域来解决跨域，分为`正向代理`和`反向代理`

**正向代理**

指代理服务器与客户端是同源的

**反向代理**

指代理服务器与服务器是同源的

### 四、WebSocket

`WebSocket` 是一种在单个 TCP 连接上进行全双工通信的协议，2008年诞生，2011年被 IETF 定为标准 `RFC 6455`，并由 `RFC7936` 补充规范，`WebSocket API` 也被 W3C 定为标准

`WebSocket` 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据， 在 `WebSocket API` 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输，同时，它也是跨域的一种解决方案

### 五、其他

1. **postMessage**

   **postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递**。

2. **window.name + iframe**

   window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

   通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

3. **location.hash + iframe**

   实现原理： a.html欲与c.html跨域相互通信，通过中间页b.html来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。

   具体实现步骤：一开始a.html给c.html传一个hash值，然后c.html收到hash值后，再把hash值传递给b.html，最后b.html将结果放到a.html的hash值中。 同样的，a.html和b.html是同域的，都是`http://localhost:3000`;而c.html是`http://localhost:4000`

4. **document.domain + iframe**

   **该方式只能用于二级域名相同的情况下，比如 `a.test.com` 和 `b.test.com` 适用于该方式**。 只需要给页面添加 `document.domain ='test.com'` 表示二级域名都相同就可以实现跨域。

   实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。