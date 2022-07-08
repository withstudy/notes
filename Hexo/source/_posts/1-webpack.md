---
title: webpack-开发环境配置
date: 2020-02-28 15:31:20
categories: webpack
tags: [webpack]
description: webpack是一个现代JavasScript应用程序的模块打包器(module bunder)官方网站https://www.webpackjs.com/
cover: https://i.loli.net/2021/09/15/2lhb6RSkeMdw8ar.jpg
---

## 基础知识

### 五个核心概念

`entry` 指定webpack打包的入口文件
`output` 配置webpack打包输出
`loader`  loader是一种打包的方案，webpack默认只识别js结尾的文件
`plugins` 插件，有些类型loader不能完全解决，需要使用插件
`mode` 指定webpack打包模式，包括开发模式、生产模式

## 安装打包初体验

初始package.json
`npm init -y`
全局安装 
`npm i webpack webpack-cli -g`
生产安装
`npm i webpack webpack-cli -D`

1、入口文件
2、运行打包
开发环境 :`webpack ./src/index.js -o ./build/built.js --mode=developent`
  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/buil.js
生产环境 :`webpack ./src/index.js -o ./build/built.js --mode=production`
  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/buil.js
3、查看是否打包成功
（1）node命令
	`npm buil.js ` (打包完成的js文件）
（2）script标签
	在build目录下新建一个html文件，在该文件中通过script标签引入打包完成的js文件

## webpack.config.js

webpack默认只能打包js、json资源,要打包样式资源要使用loader
loader在webpack.config.js中配置

webpack的配置文件,作用：指示 webpack 干那些活（当你运行 webpack 指令时，会加载里面的配置）

基本配置
```js
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
	//详细loader配置
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'production'
}
```
## 打包样式资源

打包样式资源（.css/.less）,在```module```中配置loader
需要通过npm在目录中安装```css-loader```、```style-loader```、```less-loader```
```js
module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
      }
    ]
  }
```
## 打包HTML资源

打包HTML资源需要在```plugins```中配置html-webpack-plugin:
功能: 默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
需求：需要有结构的HTML文件
注意：在配置```plugins```之前要导入```html-webpack-plugin```
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
```
```js
plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ]
```
## 打包图片资源

打包图片资源（.jpg/.png/.gif）,在```module```中配置loader
需要通过npm在目录中安装```url-loader```、```file-loader```

```js
 module: {
    rules: [
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]'
        }
      }
    ]
  }
```
## 打包图片资源

打包图片资源（排除.css/.js/.html/.less）,在```module```中配置loader
需要通过npm在目录中安装```file-loader```
```js
 module: {
    rules: [
      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        // 排除css/js/html资源
        exclude: /\.(css|js|html|less)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  }
```
## devServer

开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
特点：只会在内存中编译打包，不会有任何输出
启动devServer指令为：npx webpack-dev-server
```js
devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
```
## 开发环境配置

开发环境配置：能让代码运行
    运行项目指令：
      webpack 会将打包结果输出出去
      npx webpack-dev-server 只会在内存中编译打包，没有输出
```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理less资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  }
};
```
