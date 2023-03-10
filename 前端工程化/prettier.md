# Prettier 使用

[prettier 文档](https://www.prettier.cn/)

## 安装

```shell
npm install prettier -D
```

## 配置

`.prettierrc.js`

```js
module.exports = {
    printWidth: 80,
    tabWidth: 4,
    semi: false,
    bracketSpacing: true, // 对象的括号是否留空白
    singleQuote: true,
    trailingComma: 'none', // none|es5|all 多行时尾随逗号
    jsxBracketSameLine: true, // jsx语法元素的>换行显示(不能应用于自关闭元素)
    arrowParens: 'avoid', // avoid|always 箭头函数唯一参数是否包含括号
    proseWrap: 'preserve', // always|never|preserve
    endOfLine: 'auto'
}
// 更多配置：https://www.prettier.cn/docs/options.html
```

### 格式化修复

```shell
npx prettier --config .prettirerc.js --write src/*
```

## 问题

与eslint同时使用时，可能配置冲突

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