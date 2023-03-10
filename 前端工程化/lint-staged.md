# lint-staged

Lint-staged可以在git staged阶段的文件上执行Linters，简单说就是当我们运行ESlint或Stylelint命令时，可以通过设置指定只检查我们通过git add添加到暂存区的文件，可以避免我们每次检查都把整个项目的代码都检查一遍，从而提高效率

## 安装

```shell
npm install lint-staged --save-dev
```

## 配置

`package.json`

```json
"lint-staged": {
  "*.vue": [ // .vue 执行的操作
    "eslint --fix",
    "stylelint --fix",
    "git add"
  ],
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "git add"
  ],
  "*.{htm,html,css,sss,less,scss,sass}": [
    "stylelint --fix",
    "git add"
  ]
}
```