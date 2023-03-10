# Husky 使用

[husky 文档](https://www.breword.com/typicode-husky)
[支持的钩子](https://git-scm.com/docs/githooks)

Husky 可以防止错误的 git commit ， git push

## 安装

```shell
npm install husky -D
```

## 配置

`.huskyrc.js`

```js
module.exports = {
    "hooks": {
        "pre-commit": "commitlint --edit $1", // 提交的时候 进行eslint检查
    }
}
```