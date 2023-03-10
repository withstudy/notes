# Eslint 使用

[eslint 文档](https://eslint.bootcss.com/)

## 安装

```shell
npm install eslint -D
```

## 初始化

```shell
npx eslint --init
```

配置文件：

`.eslintrc.js`：检查规则配置

```js
module.exports = {
    env: { // 使用的环境
        browser: true,
        es2021: true,
        commonjs: true,
        node: true
    },
    extends: 'eslint:recommended', // 继承规则模板
    overrides: [],
    globals: { // 全局变量
        $: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {}
}
```
`eslintignore`: 不需要检查的文件与文件夹

```txt
node_modules/
lib/
dist/
```

## 检查

```shell
npx eslint src
```

## 问题

与prettier同时使用时，可能配置冲突

解决问题：

```shell
npm install eslint-config-prettier eslint-plugin-prettier -D
```

`.eslintrc.js`

```js
module.exports = {
    // ...
    extends: ['eslint:recommended', 'plugin:prettier/recommended'], 
    // ...
}
```

