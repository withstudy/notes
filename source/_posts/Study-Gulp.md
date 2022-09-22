---
title: Gulp-基本使用
date: 2022-09-22 17:32:27
categories: gulp
tags: [gulp]
description: 学习总结
cover: https://s2.loli.net/2022/09/22/rBGRXmp9ECS4YHo.png
---
# Gulp

## 一. 安装与使用
### 1. 安装
```shell
npm install gulp
```
### 2. 使用

在根目录下创建`gulpfile.js`,该文件中就可以创建任务了

```js
exports.foo = done => {
    console.log('foo task~')
    done()
}
// 默认任务
exports.default = done => {
    console.log('default task~')
    done()
}
```
> 使用`gulp 任务名`就可以执行任务了；例如：`gulp foo`

## 二. 任务

### 1. 结束任务

每个任务都是异步调用，所以**gulp**在执行任务时会传入`done`函数，需要在任务执行完毕之后，执行该函数，表示任务执行完毕

表示任务执行结束方式有

* 执行gulp提供的`done`方法
* 返回一个Promise对象：Promise的`resolve`与`reject`可以结束任务
* await/async
* 返回stream对象

```js
const fs = require('fs')

exports.callback = done => {
  console.log('callback task')
  done()
}

exports.callback_error = done => {
  console.log('callback task')
  done(new Error('task failed'))
}

exports.promise = () => {
  console.log('promise task')
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise task')
  return Promise.reject(new Error('task failed'))
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000)
  console.log('async task')
}

exports.stream = () => {
  const read = fs.createReadStream('yarn.lock')
  const write = fs.createWriteStream('a.txt')
  read.pipe(write)
  return read
}
```
> 其中`done(new Error('error'))`和Promise的`reject`,当执行多个任务的时候，会终端后续任务的执行

### 2. 多任务构建

多任务构建方法有

1. **series**: 串行执行各个任务
2. **parallel**: 并行执行各个任务

```js
const {series,parallel} = require('gulp')

const task1 = done => {
    setTimeout(() => {
        console.log('task1 msg~')
        done()
    },1000)
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 msg~')
        done()
    },1000)
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 msg~')
        done()
    },1000)
}
// 串行执行各个任务, 每隔一秒打印一次
exports.series = series(task1,task2,task3)
// 并行执行各个任务，一秒之后打印三次
exports.parallel = parallel(task1,task2,task3)
```

## 三. 构建过程

gulp的构建过程可以概括为`输入-读取流`、`加工-转换流`、`输出-写入流`

例子：压缩css文件
```js
const fs = require('fs')
const {Transform} = require('stream')
exports.default = () => {
    // 创建读取流
    const readStream = fs.createReadStream('base.css')
    // 创建写入流
    const writeStream = fs.createWriteStream('base.min.css')
    // 转换流
    const transform = new Transform({
        transform:(chunk, encoding, callback) => {
            // chunk为Buffer，转换为字符串
            const input = chunk.toString()
            //去除空格和注释
            const output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'')
            callback(null,output)
        }
    })

    // 将读取的文件流导入写入的文件流
    readStream
        .pipe(transform) //转换
        .pipe(writeStream) //写入

    // 返回stream流可以结束任务
    return readStream
}
```

**在gulp中封装了写入流`src`和输出流`dest`的api，其实就是node`fs`模块的增强**

**而转换流一般由不同的插件完成**

借助`src`、`dest`以及`gulp-clean-css`插件，可以简化上面的例子：压缩css文件
```js
const {src,dest} = require('gulp')

const cleanCss = require('gulp-clean-css')

exports.default = () => {
    return src('base.css')
        .pipe(cleanCss())
        .pipe(dest('dist'))
}
```

## 四. 常用插件
* `gulp-babel`: 转换js
* `gulp-clean-css`: 压缩css
* `gulp-htmlmin`: 压缩HTMl
* `gulp-imagemin`: 压缩图片
* `gulp-uglify`: 压缩js
* `gulp-sass`: 编译sass
* `gulp-load-plugins`: 自动加载gulp插件