---
title: 浏览器：WebStorage
date: 2021-12-02 15:27:10
categories: 浏览器
tags: [浏览器]
description: 学习总结
cover: https://i.loli.net/2021/12/02/mBz6KwcxZdS7q5G.jpg
---
# 浏览器：WebStorage

WebStorage网页存储，用于在前端存储数据，常见的有`Cookie`、`LocalStorage`、`SessionStorage`、`IndexDB`

## Cookie

**HTTP协议是无状态的，HTTP协议自身不对请求和响应之间的通信状态进行保存**

当一个用户登录之后，HTTP是无状态的并不知道用户已经登录，需要一个东西来保存这个状态，这个就是Cookie。

Cookie就是维护客户端与服务器之间的一个状态，通常服务器将某个表示状态的数据进行加密，通过响应头`set-cookie`返回给客户端，然后客户端保存。

Cookie并不会一直保存在客户端，可以设置一个过期时间，如果不设置过期时间，那么就是会话级别的，网页已关闭就删除

Cookie可以用来共享数据，但是受`同源策略`影响，只能在同源的网页才能获取到一样的cookie

缺点：

* 只能是字符串，并且只能保存4kb的内容

* 没有自己的api，需要用户自己封装

* 在客户端发送的每一个请求时，cookie必须同时发送给服务器，增加请求的体积

* 不安全，如果不设置`http-only`攻击者可以使用JavaScript就可以获取到Cookie实施`XSS攻击`

  > 相关属性
  >
  > **http-only**：不能使用Javascript访问cookie，减少`XSS攻击`
  >
  > **secure**：只能在协议为HTTPS的请求中携带
  >
  > **same-site**：规定浏览其不能再跨域请求中携带cookie，减少`crsf攻击`

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

```js
var cookie = document.cookie;//获取cookie
document.cookie = 'color:blue;' + cookie;//设置cookie
```

> cookie和session的区别？
>
> 答：
>
> * 单个cookie保存的数据不能超过4kb；session大小没有限制。
>
> * cookie保存在浏览器，session保存在服务器
>
> * session保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大。
>
>   在客户端发送的每一个请求时，cookie必须同时发送给服务器，增加请求的体积

## LocalStorage/SessionStorage

两者的特点：

- 大小为5M左右
- 仅在客户端使用，不和服务端进行通信
- 接口封装较好，有自己的api
- 受同源策略影响

不同点：

* SessionStorage是会话级别网页关闭就会清除，而LocalStorage需要手动清除，不然一直存在

```js
 localStorage.setItem（'name','world'）
 sessionStorage.setItem（'gender','female'）
 var name=localStorage.getItem('name')
 var gender=sessionStorage.getItem('gender')
```

## IndexDB

IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。

[浏览器数据库 IndexedDB 入门教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)

* **window.indexedDB.open**打开一个数据库,onsuccess、onerror、onupgradeneeded监听一个数据库的成功、失败、新建（升级），接受两个参数（数据库名，版本（默认1，新建1））
* **db.createObjectStore**创建一个表
* **objectStore.createIndex**创建索引
* **db.transaction**创建一个事务
* **objectStore.add**添加数据
* **objectStore.put**修改数据
* **objectStore.delete**删除数据
* **objectStore.get**获取数据
* **objectStore.openCursor**打开列表指针

```js
//打开一个数据库
		let res = window.indexedDB.open("db");
		let db;
		//监听打开成功
		//如果数据库存在会执行这个事件，而不会执行onupgradeneeded
		res.onsuccess=(e)=>{
			db=res.result;

			add(1)
			add(2)
			add(3)
			// put()
			// read()
			// del()
			list();
			console.log("indexDB打开成功")
		}
		//监听打开失败
		res.onerror=()=>{
			console.log("indexDB打开失败")
		}
		//监听创建（数据库升级事件）
        //初次创建数据库会执行这个事件
		res.onupgradeneeded=(res)=>{
			db = event.target.result;
			//创建一个表
			//自动生成组件  自增
			// var objectStore = db.createObjectStore('person',{ autoIncrement: true });
			//person表   主键id
			let objectStore=db.createObjectStore("person",{keyPath:"id"});
			//创建索引
			objectStore.createIndex('name', 'name', { unique: false });
			// console.log(objectStore)
		}

		
		//添加
		function add(id) {
			//新建一个事务。新建时必须指定表格名称和操作模式（"只读"或"读写"）
			let res=db.transaction(["person"],"readwrite");
			//打开表
			let tab=res.objectStore("person");
			//添加
			let create=tab.add({id:id,name:"张三",sex:"男",age:15});
			//监听添加成功/失败
			create.onsuccess=()=>{
				console.log("添加成功")
			}
			create.onerror=()=>{
				console.log("添加失败")
			}
			console.log(tab)
		}
		//获取记录
		function read(){
			let res=db.transaction(["person"]);
			let tab=res.objectStore("person");
			let get=tab.get(1)
			get.onsuccess=()=>{
				let data=get.result;
				console.log(data)
			}
			get.onerror=()=>{
				console.log("获取数据失败")
			}
		}
		//修改
		function put(){
			let res=db.transaction(["person"],"readwrite");
			let tab=res.objectStore("person");
			let update=tab.put({id:1,name:"王五",sex:"女",age:22})
			update.onsuccess=()=>{
				console.log("数据更新成功");
			}
			update.onerror=()=>{
				console.log("数据更新失败");
			}
		}
		//删除
		function del(){
			let res=db.transaction(["person"],"readwrite");
			let tab=res.objectStore("person");
			let d=tab.delete(1);
			d.onsuccess=()=>{
				console.log("数据删除成功");
			}
		}
		//列表获取
		function list(){
			let res=db.transaction(["person"]);
			let tab=res.objectStore("person");
			let cursor=tab.openCursor()
			cursor.onsuccess=(e)=>{
				let data=e.target.result;
				if(data){
					console.log(data.value)
					data.continue();
				}else{
					console.log("没有更多数据了")
				}
			}
		}
```

