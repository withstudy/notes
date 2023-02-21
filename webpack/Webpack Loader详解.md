## Webpack Loader详解

Loader 的本质是导出一个**函数**的 Node 模块，它所导出的函数将在读取到目标类型（通常在 `module.rules` 中配置）源文件时调用，源文件字符串将作为参数传入这个函数，并且函数中可以通过 this 关键字访问到上下文信息和使用[ Loader API](https://webpack.js.org/api/loaders/) 中指定的属性和方法，最终**同步**或**异步**地返回处理后的结果

Loader处理过程：

- 根据解析的 Loader 文件路径，加载 Loader 模块，兼容 commonJS、ESModule 或 SystemJS 方式
- 按 Loader 链数组控制 Loader 的调用过程，具体调用顺序在 Pitching Loader 小节中进一步说明，简单来说包括三个部分：pitch阶段 => 处理资源内容阶段 => Loader 函数调用阶段（同步或异步）

- 持续更新 Loader Context 信息
- 获取执行后的结果并返回 Webpack 编译流程

### 一、自定义简单的Loader

```js
function loaderDemo(content) {
  // 可以查看 this 提供的上下文信息和可以使用的API
  console.log(this);
  // 该函数需要返回处理后的结果，直接返回输入source，相当于未对资源做任何处理
  return content;
}
module.exports = loaderDemo;
```

**注意：loader必须返回js字符串**

#### 1、获取配置

在 `module.rule` 配置中可以给 Loader 提供用户配置，使用 `loader-utils` 提供的 `getOptions` API 获取，

```js
const loaderUtils = require('loader-utils');
module.exports = function(content) {
  // 获取到用户给当前 Loader 传入的配置
  const options = loaderUtils.getOptions(this);
  return content;
};
```

#### 2、二进制格式数据

默认情况下 Loader 函数中获取到的源码是 UTF-8 编码的字符串，在某些场景下需要获取到二进制格式的数据，比如 `file-loader` ，这时需要配置 `raw` 标记为 true

```js
module.exports = function(content) {
  content instanceof Buffer === true;
  return content;
};
// 通过 exports.raw = true 表示该 Loader 需要二进制格式数据
module.exports.raw = true;
```

#### 3、返回其他结果

Loader 通过 `return` 语句返回翻译后的内容，内容可以是 String 或 Buffer 格式，但如果需要返回其他额外信息， `return` 就不够用了，需要使用 `this.callback` 这个 API ，它有四个主要参数：

```js
this.callback(
  err: Error | null, // Loader处理过程中出错时，需要抛出一个Error，无错误时需要指定为 null
  content: string | Buffer, // 转换后的内容，可以是 String 或 Buffer 格式
  sourceMap?: SourceMap, // 可选：可被 Webpack 解析的 SourceMap
  meta?: any, // 可选：用户自定义的其他数据，会被 Webpack 忽略
  ... // 可选：任意个数其他参数
);
```

使用 `this.callback` ，则函数的 return 必须返回 `undefined` ，Webpack 根据 return 内容来确认从哪里获取 Loader 翻译的结果

#### 4、异步 Loader

Loader 函数除了同步返回（ return 或 this.callback ）解析结果，还可以异步执行再返回结果，比如有些场景下需要异步请求网络或长时间的计算操作，此时同步返回会阻塞整个构建流程，建议借助 this.async API等待异步操作执行完成后再返回转化结果：

```
module.exports = function(content) {
  // 通过 this.async API 获取异步返回的回调函数
  const callback = this.async();
  // 使用定时器模拟异步操作
  setTimeout(()=>{
    // 通过 callback 返回异步执行后的结果
    callback(err, content, sourceMap, meta);
  }, 2000);
};
```

#### 5、Pitching Loader

大家都知道Loader的执行顺序是从右到左执行的，其实不然，比如：

```js
... ... 
module: {
  rules: [
    {
      //...
      use: [
        'a-loader',
        'b-loader',
        'c-loader'
      ]
    }
  ]
}
... ...
```

实际的调用执行顺序如下：

```
|- a-loader `pitch` 调用
  |- b-loader `pitch` 调用
    |- c-loader `pitch` 调用
      |- 请求模块资源文件被读取，并添加到依赖中
    |- c-loader 调用
  |- b-loader 调用
|- a-loader 调用
```

 pitch 函数中的入参包括：

●remainingRequest 

●precedingRequest

●data

```
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  // ... ...
};
```

如果在 `pitch` 函数中返回值，会跳过余下所有 Loader 的 `pitch` 函数的调用和 Loader 正常调用流程，仅执行已经历 `pitch` 函数调用流程的 Loader 的正常调用流程。