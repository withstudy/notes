# Stylelint

[docs](https://stylelint.io/user-guide/get-started)

## 安装

```shell
npm install --save-dev stylelint stylelint-config-standard
```

## 配置

`.stylelintrc.js`

```js
module.exports = {
    extends: ["stylelint-config-standard"]
}
```

`.stylelintignore`: 需要忽略的文件

```txt
vendor/**/*.css
```

## 更多

```shell
npm i stylelint stylelint-prettier stylelint-config-recess-order stylelint-config-standard -D
```

* `stylelint-prettier`: stylelint 的 prettier 插件
* `stylelint-config-standard`: stylelint 的 standard 规则集合
* `stylelint-config-recess-order`: stylelint 的 样式属性顺序规则

`.stylelintrc.js`

```js
module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true
  }
};
```