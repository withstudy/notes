---
title: React
date: 2020-06-22 12:36:18
categories: React
tags: [React]
description: React
---

### React

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的UI 界面，这些代码片段被称作“组件”。

#### 一、js支持

- react.js   :     React的核心库
- react-dom.js   :   提供操作Dom 的react 扩展库
- babel.min.js   ： 解析 JSX 语法代码转为纯JS 语法代码库

#### 二、组件

##### 1、工厂方法组件 ：简单组件，只有数据显示等简单操作

```js
 function MyCompoent() {
         return (
             <h1>MyCompoent,方法组件</h1>
         );
 }
```

##### 2、ES6 类组件 ：复杂组件，需要对数据进行操作的操作的复杂操作

```js
class MyCompoent2 extends React.Component{
     render(){
          return (
              <h1>MyCompoent2,类组件</h1>
          );
     }
}
```

#### 三、组件三大属性 

##### 1、state

类组件中，才会state 属性
state 是一个对象，也称是组件的状态，如果state 的值改变，也称状态改变，就会重新渲染页面（一般结合 事件方法 来改变状态）

###### （1）设置状态：一个类组件，最开始的state 为 null，我们通过构造方法来初始化 state

```js
constructor(props){
       super(props); 
            this.state={
            is:true
      }
}
```

注意：构造函数中需要调用父类的构造函数 ```super(props);```

###### (2) 使用状态：使用state 的值 通过 this.state.is  来使用

```js
<h1>{this.state.is ? "我喜欢你":"你喜欢我"}</h1>
```

###### (3) 修改状态：改变state 通过 this.setState() 方法来实现，传入一个对象

```js
this.setState({
    is:false
})
```

注意：我们需要通过一种操作来改变状态，需要结合事件方法来实现，这个时候我们要注意事件处理方法中的this 指向问题
	          方法的this 是 undefined，我们就不能调用到组件的属性
	          我们可以在 ```构造方法``` 中使用  
			```this.fun=this.fun.bind(this);```
	         来绑定this  的指向 或者 
		 	```<h1 onClick={()=>this.fun()}></h1>```

##### 2、props

方法组件、类组件 都存在props 属性

###### （1）设置props

   props 是通过组件自定义的属性，传递给组件，供组件使用，可以是对象 等任意类型，

```js
<MyCompoent msg="this is MyCompoent"/>
```

###### (2）使用props

- 方法组件 通过传入的参数来使用

```js
function MyCompoent(props) {
     return (
         <h1>{props.msg}</h1>
     );
}
```

- 类组件 通过this.props.msg 使用

```js
class MyCompoent2 extends React.Component{
      render(){
          return (
               <h1>{this.props.msg}</h1>
          );
     }
}
```

###### (3）其他

- 设置属性默认值

```js
MyCompoent.defaultProps={
	msg:"666"
}	
```

- 设置属性类型 和必要性

```js
Time.propTypes={
       name:PropTypes.string.isRequired,    //name属性  字符串类型     必须有
       age:PropTypes.number //age 属性    数字类型  
}
```

##### 3、refs

表示组件内的元素

###### （1）设置refs

​		第一种
​		      ```<input type="text" ref="context"/>   //老版本   现在也可以用```
​		第二种
​		      ``` <input type="text" ref={ e => this.context=e}/>  //新版本
​			//直接将该标签 绑定给 组件对象的一个属性```

###### (2）使用refs

​		第一种
​			```this.refs.context.value  //获取input的值```
​		第二种
​			```this.context.value   //获取input的```

###### (3) 获取表单数据

- > 使用ref绑定input 输入框，获取输入数据

-   >  创建一个状态state，将其设置为输入框的value
    >
    >  输入框通过onChange 实时改变状态的值，就得到了输入数据

#### 四、组件生命周期

##### 1、第一次初始化渲染显示：ReactDom.render()

> constructor()：创建对象初始化 state
>
> componentWillMount()：将插入回调
>
> render()：用于插入虚拟DOM回调
>
> componentDidMount()：已经插入回电

##### 2、每次更新state：this.setState()

> componentWillUpadate()：将要更新回调
> render()：更新，重新渲染
> componentDidUpdate()：已经更新回调

##### 3、移除组件：ReactDOM.unmountComponentAtNode(contarnerDom)

> componentWillUnmount()：组件将要被移除回调

#### 五、组件间的通信

- 方式一：通过props 传递

> 共同的数据放在父组件上，特有的数据放在自己组件内部state
> 通过props 可以传递一般数据和函数数据，只能一层一层的传递
> 一般数据 --> 父组件传递数据给子组件 --> 子组件使用数据
> 函数数据 --> 子组件传递数据个父组件 --> 子组件调用函数

- 方式二：使用消息订阅（subscribe）-发布（publish）机制

  > 工具库：PubSubJS
  >
  > 下载：npm install pubsub-js --save
  > 使用：
  >          PubSub.subcribe("名称",“回调函数”)；//订阅
  >          PubSub.publish("名称","参数.."); //发布

#### 六、React-Router

##### 1、安装

```js
npm install --save react-router-dom
```

##### 2、使用

- 在应用的入口文件 使用根组件（App.js）时，引入 BrowserRouter 或者 HashRouter 标签，将根组件作为它的子标签

```js
 import {BrowserRouter} from "react-router-dom";
ReactDOM.render(
	<BrowserRouter>
		 <App />
	</BrowserRouter>,
	document.getElementById('root')
);
```

- 编写路由组件
- 路由链接：```<Link/>,<NavLink/>```
-  路由：```<Route/>```

##### 例子：

```js
<div className="App">
	        <div>
	            <Link to="home" >home</Link>
	            <Link to="about" >about</Link>
	        </div>
	        <div>
	            <Switch>
	                <Route path="/home" component={Home}></Route>
	                <Route path="/about" component={About}></Route>
	                <Redirect to="/home"></Redirect>
	            </Switch>
	        </div>
</div>
```

- ``<Switch/>`` : 同一时刻只能显示一个组件
- ```<Redirect/>```：重定向

##### 3、路由传值

###### (1）设置路由

```js
<Route path="/about/:id" component={About} />
```

#id 可任意取

######  (2）设置路由链接

```js
<Link to="/about/1">about</Link>
```

###### (3）获取值

```js
 this.props.match.params.id
```

 #id 对应路由中的名称

##### 4、路由跳转方式

###### (1）路由链接

  就是使用Link 标签，这样的方式不会发送请求

```js
<Link to="/about/1">about</Link>
```

###### (2）非路由链接

一般是指a 标签，这样的方式会发送请求

```js
<a href="/home">home</a>
```

###### (3）history    ----   this.props.history

 通过给history push或者replace来跳转

- ``this.props.history.push("/home");``
- ``this.props.history.replace("/home");``

 区别：replace 会替换掉上一个页面，如果向返回上一个页面，就不会返回成功

 history 的回退与前进

> this.props.history.goBack();
> this.props.history.goForward();

一般这种方式用于不用链接的方式跳转，比如：按钮点击