# lerna

## 安装

```shell
npm install lerna -g
```

## 初始化

```shell
lerna init --independent
```

> lerna有两种工作模式:
> * Independent模式: lerna会配合Git，检查文件变动，只发布有改动的包
> * Fixed模式: lerna会检查所有包，发布所有包

## lerna.json

```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "0.0.0"
}
```

## 常用命令

* lerna create：此命令的作用是用来创建一个子包名为xx的项目。
* lerna add：此命令用于安装依赖，格式为lerna add [@version] [–dev], v7之后删除。
* lerna list：查看当前包名列表。
* lerna link：将所有相互依赖的包符号链接在一起。
* lerna exec：在每个包中执行任意命令。
* lerna run：在每个包中运行npm脚本如果该包中存在该脚本。

## 基本使用

### 创建子包
```shell
lerna create module-a
lerna create module-b
```
* module-a.js
```js
'use strict';

module.exports = moduleA;

function moduleA() {
  return 'Hello from moduleA';
}
```
* module-b.js
```js
'use strict';

const moduleA = require('module-a');
console.log(moduleA)

module.exports = moduleB;

function moduleB() {
  return 'Hello from moduleB';
}
```
> 运行：npm packages/module-b/lib/module-b.js
> 输出：Error: Cannot find module 'module-a'

### 安装依赖
```shell
cd packages/module-b
npm add module-a
```
> 运行：npm packages/module-b/lib/module-b.js
> 输出：[Function: moduleA]
