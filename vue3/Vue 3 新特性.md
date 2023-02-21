## Vue 3 新特性

`Vue3.0`的设计目标可以概括为体积更小、速度更快、加强`TypeScript`支持、加强`API`设计一致性、提高自身可维护性、开放更多底层功能。

### 一、生命周期

在vue3中`setup`替代了`beforeCreate`和`created`，并且其他得生命周期都改变了名字

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3eadd1ec0ac94343951ae2453cf41fce~tplv-k3u1fbpfcp-watermark.awebp" alt="img" style="zoom:25%;" />

### 二、编码方式

1、vue3的采用了函数式的编码方式，将很多的api都实现为了函数，比如：`reactive`、`ref `

`reactive`和`ref`都可以创建响应式数据，不同的是`ref`应用于基本数据类型的数据，`reactive`应用于复杂数据类型的数据

`toRefs`可以实现`reactive`到`ref`的转换



2、vue3从options api转为compositon api

使用过vue2的都知道，在vue实例中都有，`data`、`methods`、`computed`、`watch`等属性，在对应的地方写上代码就可以使用，这样方式的有点就是简单，上手快，但是也带来了很多缺点，①、代码可读性差，明明一块逻辑代码，但是要写在不同的地方。②、代码复用能力差，在vue2中代码的复用都是采用`mixin`的方式，但是`mixin`也有很多的缺点。

而在vue3中，所有的逻辑代码都卸载setup函数中，data、computed、watch都可以通过vue提供的函数来创建，一块逻辑就可以写在一起，如果是公共逻辑，也可以提成单独文件来实现代码的复用



### 三、源码实现

1、响应式实现

在vue2中的响应式采用的是`Object.defineProperty`api来实现的，缺点就是对于数组监听并不理想，所以在vue2中监听数据采用的是拦截数组中能够修改自身的方法来实现。

而在vue3中，采用了ES6 新增的 Proxy来实现的，更加方便

2、diff优化

在vue3中的虚拟DOM中，对于静态的标签和组件添加了静态标记，在diff的时候，如果发现静态标记，将跳过diff，

Vue.js 3.0 在编译阶段还包含了对 Slot 的编译优化、事件侦听函数的缓存优化，并且在运行时重写了 diff 算法。