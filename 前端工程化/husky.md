# Husky 使用

[husky 文档](https://www.breword.com/typicode-husky)
[支持的钩子](https://git-scm.com/docs/githooks)

Husky 可以防止错误的 git commit ， git push

## 安装

```shell
npm install husky -D
```

## 使用

* 创建.husky文件夹

```shell
npx husky install
```

* 添加hooks

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```