;# GithubActions

`GithubActions`是`github`提供的一个持续集成的方式

1. 创建`personal access tokens`

> Setting(个人设置) -> Developer settings -> Personal access tokens

创建之后保存下来

2. 创建ci.yml

在本地的项目中创建`.github/workflows/ci.yml`的配置文件，并写入以下内容
```yaml
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Build and Deploy
        uses: JamesIves/github-pages-deploy-action@master
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: dist
          BUILD_SCRIPT: npm install && npm run build
# https://github.com/marketplace/actions/deploy-to-github-pages
```

* `on`: 表示触发的条件
  上面的`on`部分表示，**当往`master`分支`push`的时候触发**
* `jobs`: 工作流程

> 配置ACCESS_TOKEN
> 
> Settings(项目配置) -> Secrets -> New Secrets
> 
> NAME = ACCESS_TOKEN
> 
> VALUE = [personal access token]  (上面创建过)



3. 修改package.json

在`package.json`中新增`homepage`属性
```json
{
//  ...
  "homepage": "https://[用户名].github.io/[仓库名称]",
//  ...
}
```

4. 修改静态文件路径

在本地项目中，修改webpack配置，如果使用的是vue-cli，创建vue.config.js,加入以下配置
```js
module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? '/[github的仓库名称]/' : '/'
}
```

主要目的是确保输出的打包目录名称为`dist`和`静态文件的加载路径`

**然后将修改提交推送到仓库中**

5. 启动Action

在`github`仓库中，进入`Actions`，然后选择创建的`Actions`,就可以看到`Actions`工作的过程

等待Actions工作完毕之后，就可以在分支列表中看到新的分支`gh-pages`

6. 开启GithubPages

> Settings -> Github Pages

选择分支 `gh-pages` 保存

可以使用`https://[用户名].github.io/[仓库名称]`访问仓库中的`index.html`或`README.md`

[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

