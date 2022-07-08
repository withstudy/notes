---
title: webpack-开发环境配置 2
date: 2020-02-29 14:44:20
categories: webpack
tags: [webpack]
description: webpack是一个现代JavasScript应用程序的模块打包器(module bunder)官方网站https://www.webpackjs.com/
cover: https://i.loli.net/2021/09/15/2lhb6RSkeMdw8ar.jpg
---

## 提取css成单独文件

一般webpack打包，会把css打包到js文件中，如果在生产环境时，需要把css文件提取成单独的一个文件，减小打包结果的js文件的体积
提取css成单独文件需要使用插件`mini-css-extract-plugin`,我们需要通过npm下载，然后导入
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```
在插件`plugins`中配置
```js
 plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    })
  ]
```
然后将处理css的'style-loader'替换，'style-loader'会在html添加style标签
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader'
        ]
      }
    ]
  }
```

## css兼容性处理

css兼容性处理：postcss --> postcss-loader postcss-preset-env
需要通过npm下载`postcss-loader`、`postcss-preset-env`

还需要在文件夹得package.json中配置`browserslist`,而`postcss-preset-env`帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

package.json
```js
	browserslist": {
              // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version",//兼容chrome 最近得版本
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境：默认就是看生产环境
              "production": [
                ">0.2%",
               "not dead",//已经死掉得版本
                "not op_mini all"//不要op_mini的浏览器
              ]
            }
```
在开发环境的时候，需要设置node环境变量:
```js
process.env.NODE_ENV = development
```
使用`postcss-loader`的默认配置
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
	//提取css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 使用loader的默认配置
           'postcss-loader',

          } ] }] }
```
修改`postcss-loader`的配置
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ] } 
         }]} ]}
```
## 压缩css文件

压缩只需要npm下载插件`optimize-css-assets-webpack-plugin`
```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
```
```js
 plugins: [
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ]
```

## js语法检查

js语法检查需要npm下载： eslint-loader  eslint
 注意：只检查自己写的源代码，第三方的库是不用检查的
```js
	package.json中eslintConfig中设置~
 	"eslintConfig": {
                "extends": "airbnb-base"
              }
```
```js
webpack.config.js的loader配置
module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//第三方的库是不用检查的
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true
        }
      }]}
```

## js兼容性处理

  js兼容性处理：babel-loader @babel/core 
1. 基本js兼容性处理 --> @babel/preset-env
         问题：只能转换基本语法，如promise高级语法不能转换
2. 全部js兼容性处理 --> @babel/polyfill  //直接在js中引入`import "@babel/polyfill "`
         问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
3. 需要做兼容性处理的就做：按需加载  --> core-js
```js
npm i babel-loader @babel/preset-env @babel/core -D
npm i core-js -D
```
```js
webpack.config.js的loader配置
 module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//只需要兼容我们自己写的js
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }]]} }]}
```
## js压缩

 // 生产环境下会自动压缩js代码
 `mode: 'production'`

## html压缩

heml压缩需要使用插件`html-webpack-plugin`
```js
//导入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//配置插件
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })]
```