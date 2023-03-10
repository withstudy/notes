# commitlint

[文档](https://commitlint.js.org/#/)

## 安装

```shell
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

## 配置

`commitlint.config.js`

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-case': [2, 'always', ['lower-case', 'upper-case']],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'chore',
                'revert'
            ]
        ]
    }
}
```

* build : 更改构建系统和外部依赖项（如将 gulp 改为 webpack，更新某个 npm 包）
* ci : 对 CI 配置文件和脚本的更改
* docs : 仅仅修改文档说明
* feat : 增加一个新特性
* fix : 修复一个 bug
* perf : 更改代码以提高性能
* refactor : 代码重构时使用
* style : 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
* test : 增加新的测试功能或更改原有的测试模块