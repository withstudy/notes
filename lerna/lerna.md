# lerna

lerna 可以使用monnorepo架构来管理多项目代码

## 安装

```shell
npm install lerna -g
```

## 初始化

```shell
lerna init --independent
```

> lerna有两种工作模式:
>
> * Independent模式: lerna会配合Git，检查文件变动，只发布有改动的包
> * Fixed模式: lerna会检查所有包，发布所有包

> 在最新版中的lerna，需要现在package.json中添加workspaces字段，来指定项目根目录下的包。

## lerna.json

```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "0.0.0"
}
```

## 常用命令

* lerna create：此命令的作用是用来创建一个子包名为xx的项目。
* lerna add: 此命令的作用是用来将一个包添加到当前项目中。**最新版本已移除**
* lerna bootstrap：此命令的作用是用来安装当前项目中所有的依赖。**最新版本已移除**
* lerna list：查看当前包名列表。
* lerna link：将所有相互依赖的包符号链接在一起。
* lerna exec：在每个包中执行任意命令。
* lerna run：在每个包中运行npm脚本如果该包中存在该脚本。

## 基本使用

### 创建workspaces

```json
{
  //...
  "workspaces": [
    "utils/*",
    "lib/*"
  ],
  // ...
}
```

### 创建子包

```shell
lerna create math utils -y
lerna create date utils -y
lerna create math-sum lib -y
lerna create date-format lib -y
```

> `lerna create <package> [workspace] -y`
> package: 需要创建的包名
> workspace: 指定包所在的目录，默认为`workspaces`中的第一个
> -y: 使用默认的`package.json`配置

* `utils/math`

```js
'use strict';
module.exports = math;

function math() {
  return 'Hello from math';
}

```

* `utils/date`

```js
module.exports = date;

function date() {
  return 'Hello from date';
}
```

* `lib/math-sum`

```js
const math = require('math');

function mathSum() {
  console.log(math())
  return 'Hello from mathSum';
}
mathSum()
```

* `lib/date-format`

```js
const date = require('date');

function dateFormat() {
  console.log(date());
  return 'Hello from dateFormat';
}
dateFormat()
```

> 运行：npm lib/data-format/lib/date-format.js
> 输出：Error: Cannot find module 'date'
>
> 运行：npm lib/math-sum/lib/math-sum.js
> 输出：Error: Cannot find module 'math'

### 安装依赖

```shell
# lerna最新版本方式
npm add date -w date-format
npm add math -w math-sum
```

> 运行：npm lib/data-format/lib/date-format.js
> 输出：Hello from date
>
> 运行：npm lib/math-sum/lib/math-sum.js
> 输出：Hello from math
