# 浏览器：Web安全

前端需要注意的常见的攻击类型及防御

## 一、XSS

跨站脚本攻击（Cross Site Script）,本来缩写是 CSS, 但是为了和层叠样式表（Cascading Style Sheet, CSS）有所区分，所以安全领域叫做 “XSS”；

XSS攻击，通常是指攻击者通过 “HTML注入”篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，对用户的浏览器进行控制或者获取用户的敏感信息（Cookie, SessionID等）的一种攻击方式。

危害：

* **可以窃取 cookie信息**。恶意 JavaScript可以通过 ”doccument.cookie“获取cookie信息，然后通过 XMLHttpRequest或者Fetch加上CORS功能将数据发送给恶意服务器；恶意服务器拿到用户的cookie信息之后，就可以在其他电脑上模拟用户的登陆，然后进行转账操作。

* **可以监听用户行为**。恶意JavaScript可以使用 "addEventListener"接口来监听键盘事件，比如可以获取用户输入的银行卡等信息，又可以做很多违法的事情。

* 可以**修改DOM** 伪造假的登陆窗口，用来欺骗用户输入用户名和密码等信息。

* 还可以在页面内生成浮窗广告，这些广告会严重影响用户体验。

XSS攻击可以分为三类：反射型，存储型，基于DOM型(DOM based XSS)

* **反射型**

  恶意脚本作为网络请求的一部分。

  比如，一个`get`请求，客户端向服务器传递一个`username`，而服务器没有做任何处理，直接将`username`拼接以HTML的方式返回

  ```js
  http://127.0.0.1:3000?userName=
  ```

  ```js
  app.use(async ctx => {
      // ctx.body 即服务端响应的数据
      ctx.body = '<h1>' + ctx.query.userName + '</h1>';
  })
  ```

  当我们正常传递`username`并没有任何问题，但是如果攻击者这样传递

  ```js
  http://127.0.0.1:3000?userName=<script>alert('你完了')</script>
  ```

  那么`script`就会被执行，攻击者就可以拿到你的信息，比如`token`，`cookie`

* **存储型**

  存储型会把用户输入的数据“存储”在服务器。

  比较常见的一个场景就是，攻击者在社区或论坛写下一篇包含恶意 JavaScript代码的博客文章或评论，文章或评论发表后，所有访问该博客文章或评论的用户，都会在他们的浏览器中执行这段恶意的JavaScript代码。

  比如，在某个评论里面，攻击者🧛‍♀️输入

  ```js
  <script>alert('你完了')</script>
  ```

  然后保存，而服务器没有做任何处理，在浏览评论的时候，将所有评论查询回来，前端进行展示，那么这个`script`就会被执行，你就被攻击了🤦‍♂️

### 防御方法

* **HttpOnly**

  由于很多XSS攻击都是来盗用`Cookie`的，因此可以通过 使用HttpOnly属性来防止直接通过 `document.cookie` 来获取 `cookie`。

  需要注意的一点是：HttpOnly 并非阻止 XSS 攻击，而是能阻止 XSS 攻击后的 Cookie 劫持攻击。

* **输入和输出检查**

  永远不要相信用户的输入

  输入检查一般是检查用户输入的数据是都包含一些特殊字符，如 `<`、`>`, `'`及`"`等。如果发现特殊字符，则将这些字符过滤或编码。这种可以称为 “XSS Filter”。

  针对HTML代码的编码方式是 HtmlEncode（是一种函数实现，将字符串转成 HTMLEntrities）

* **利用CSP**

  [CSP](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FCSP) (Content Security Policy) 即内容安全策略，是一种可信白名单机制，可以在服务端配置浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。

  通常可以通过两种方式来开启 CSP：

  - 设置 HTTP Header 的 `Content-Security-Policy`

  ```
  Content-Security-Policy: default-src 'self'; // 只允许加载本站资源
  Content-Security-Policy: img-src https://*  // 只允许加载 HTTPS 协议图片
  Content-Security-Policy: child-src 'none'    // 允许加载任何来源框架
  ```

  - 设置 meta 标签的方式

  ```
  <meta 
  	http-equiv="Content-Security-Policy" 
  	content="default-src 'self'; img-src https://*; child-src 'none';">
  ```



## 二、CSRF

跨站请求伪造（Cross Site Request Forgery），是指黑客诱导用户打开黑客的网站，在黑客的网站中，利用用户的登陆状态发起的跨站请求。`CSRF`攻击就是利用了用户的登陆状态，并通过第三方的站点来做一个坏事。

要完成一次`CSRF`攻击,受害者依次完成两个步骤:

1. 登录受信任网站A，并在本地生成Cookie
2. 在不登出A的情况，访问危险网站B

举个例子啊🎈

现在有一个银行的转账链接

```js
http://127.0.0.1:3000/getMoney
```

你首先登录了这个银行的网站向看看余额，但是页面突然出现一个图片，点击就给188，结果你点击了

而这个图片并不只是图片，而是攻击者构建的一个转账的一个请求，你点击之后自动的发送了请求，并且携带了你在这个银行登录的信息cookie，服务器验证cookie发现是我的客户，结果就执行了转账的操作，你的钱就到了攻击者的钱包里

### 防御方法

* **利用cookie的SameSite**

  SameSite有3个值： Strict, Lax和None

  1. Strict。浏览器会完全禁止第三方cookie。比如a.com的页面中访问 b.com 的资源，那么a.com中的cookie不会被发送到 b.com服务器，只有从b.com的站点去请求b.com的资源，才会带上这些Cookie
  2. Lax。相对宽松一些，在跨站点的情况下，从第三方站点链接打开和从第三方站点提交 Get方式的表单这两种方式都会携带Cookie。但如果在第三方站点中使用POST方法或者通过 img、Iframe等标签加载的URL，这些场景都不会携带Cookie。
  3. None。任何情况下都会发送 Cookie数据

  我们可以根据实际情况将一些关键的Cookie设置 Stirct或者 Lax模式，这样在跨站点请求的时候，这些关键的Cookie就不会被发送到服务器，从而使得CSRF攻击失败

* **验证请求的来源点**

  由于CSRF攻击大多来自第三方站点，可以在服务器端验证请求来源的站点，禁止第三方站点的请求。 可以通过HTTP请求头中的 Referer和Origin属性。

* **验证码**

  应用程序和用户进行交互过程中，特别是账户交易这种核心步骤，强制用户输入验证码，才能完成最终请求。在通常情况下，验证码够很好地遏制CSRF攻击。**但增加验证码降低了用户的体验，网站不能给所有的操作都加上验证码**。所以只能将验证码作为一种辅助手段，在关键业务点设置验证码。

* **Anti CSRF Token**

  发送请求时在HTTP 请求中以参数的形式加入一个随机产生的token，并在服务器建立一个拦截器来验证这个token。服务器读取浏览器当前域cookie中这个token值，会进行校验该请求当中的token和cookie当中的token值是否都存在且相等，才认为这是合法的请求。否则认为这次请求是违法的，拒绝该次服务。



