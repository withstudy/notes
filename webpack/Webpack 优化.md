# Webpack 优化

version: 5.0

## 数据分析

### 日志美化

* `friendly-errors-webpack-plugin`: 可以识别某些类别的webpack错误，并给出更友好的提示
* `node-notifier`: 可以用来在命令行中显示通知

### 速度分析

* `speed-measure-webpack-plugin`: 分析 webpack 构建速度

### 体积监控

* `webpack-bundle-analyzer`: 分析打包体积

## 优化打包速度

### 缩小查找范围

* `alias`： 创建 import 或 require 的别名，可以加快编译速度
* `extensions`： 尝试按顺序解析这些后缀名。将类型比较多的文件名放在前面，比如 `.js` 放在 `.ts` 前面，因为 `.ts` 文件可以被 `.js` 文件转换

### 缓存

* `cache`/`cache-loader`：缓存生成的 webpack 模块和 chunk，来改善构建速度

## 多进程

* `thread-loader`：多进程并行构建

## 优化打包体积

### 压缩

* `terser-webpack-plugin`： 优化和压缩js资源
* `optimize-css-assets-webpack-plugin`： 优化和压缩css资源
* `image-webpack-loader`： 压缩图片
* `purgecss-webpack-plugin`: 清除无用 css 样式
* `mini-css-extract-plugin`： 分离css

### tree-shaking

* 开启 `mode: production`
* 开启 `sideEffects: false`

### 代码分割

* `splitChunks`
* `懒加载`

## scope hoisting

作用域提升