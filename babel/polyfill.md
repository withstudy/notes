# Polyfill

bable自身只支持js语法的转换，像Promise，Array.included等es2015新增的api是不能转换的

这个时候就需要使用到Polyfill垫片

## @babel/polyfill

它是babel转换api的解决方案

其依赖于core.js@2, regenertor-runtime/runtime

* core.js@2: 一个javascript标准库，包含了 ESCAScreipt 2020 在内的多项特性的 polyfill

缺点：体积太大

* core.js@3: 使用 Monorepo 进行拆包,引入了一些新的功能

> 当 core-js 升级到3.0的版本后，安装 babel@2 的 @babel/polyfill 将被弃用。
>
> 在 babel7.4.0 之前，我们可以直接安装 @babel/polyfill 来转换 API，但是在 7.4.0 之后的 Babel 版本，就会提示让我们分开引入 core-js/stable(默认安装3.x)和 regenerator-runtime/runtime

* regenertor-runtime/runtime: 转换生成器和async/await

### 使用方式

推荐使用 core-js/stable 和 regenerator-runtime/runtime

* 单独使用
```shell
npm install --save core-js regenerator-runtime
```

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```

> 不需要安装@babel/polyfill,其会锁死依赖corejs@2，core-js/stable依赖corejs@3

* webpack

```shell
npm install --save core-js regenerator-runtime
```

```js
// webpack.config.js
const path = require('path');
module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './main.js'],
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
```

> 以上方式都是全量引入polyfill，会造成项目体积变大

# @babel/preset-env

@babel/preset-env预设包含所有标准的最新特性

Babel6 的时候的名字是 babel-preset-env 在 Babel7 后，更名为 @babel/preset-env

```js
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: []
}
```

配置项：

* targets

指定项目的运行环境，根据设置的目标环境来判断需要转译哪些语法和 API

```js
module.exports = {
  presets: [["@babel/preset-env", {
  	targets: { 
      browsers: [
        'last 3 versions',
        'Android >= 4.4',
        'iOS >= 9.0',
      ],
    },
  ]],
  plugins: []
}
```

没有该配置，会寻找项目中的browserslist配置，如果没有这个配置，将会全量引入

* useBuiltIns

决定了 @babel/preset-env 该如何处理 polyfill

    * false
    默认值，不会按需加载polyfill

    * entry
    使用该配置需要如上面所说的使用方式，手动引入@babel/polyfill

    自动将import "core-js/stable" 和 import "regenerator-runtime/runtime" 转换为目标环境的按需引入。

    entry配置只针对目标环境，而不是具体代码，所以 Babel 会针对目标环境引入所有的 polyfill 扩展包，用不到的polyfill也可能会引入进来。所以，如果不需要考虑打包产物的大小，可以使用该配置。

    * usage

    不需要手动导入 polyfill，babel 检测出此配置会自动进行 polyfill 的引入，官方推荐

```js
module.exports = {
  presets: [["@babel/preset-env", {
  	useBuiltIns: "usage"
  ]],
  plugins: []
}
```

useBuiltIn 设置为 usage 或者 entry 时,需要使用corejs@3

```js
module.exports = {
  presets: [["@babel/preset-env", {
      useBuiltIns: "usage",
      corejs: 3
  }],
  plugins: []
}
```

## @babel/runtime

含有 babel 编译所需要的一些 helpers 函数。同时还提供了 regenerator-runtime，对 generator 和 async函数进行编译降级。

## @babel/plugin-transform-runtime

@babel/preset-env会导致重复导入 helpers 函数

@babel/plugin-transform-runtime作用是可以重复使用 babel 注入的 helpers 函数

主要作用：

* 可以直接将 helpers 从文件中定义改为从 @babel/runtime 中引入，避免了多次引入 helpers 辅助函数。

* 可以将 @babel/ployfill 中 API 的 polyfill 直接修改原型改为从 @babel/runtime-corejs3/helpers中获取，避免对全局变量和原型的污染。
