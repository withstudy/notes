# Yeoman

## 一、安装
1. 全局安装`Yeoman`
```shell
npm install yo -g
```
2. 安装对应的`generator`
```shell
npm install generator-node -g
```
3. 运行`gennerator`
```shell
yo node
```
> 使用步骤:
> 
> 1. 明确需求
> 2. 找到合适的`generator`
> 3. 安装`generator`
> 4. 使用`yo`运行generator`
> 5. 命令行交互输入信息
> 6. 生成项目结构

## 二、自定义`Generator`

1.安装`yeoman-generator`
```shell
npm install yeoman-generator -g
```

2.创建项目结构
```text
- generators/
    - app/
        - templates/     //模板文件存放位置
        - index.js       //程序入口
    - package.json
```

3. 编写入口文件
```js
const Generator = require('yeoman-generator')

module .exports = class extends Generator{
    //命令行交互
    prompting(){
        return this.prompt([
            {
                type: 'input',//类型 input：输入
                name: 'name',//名称
                message: 'Your project name',//提示
                default: this.appname //默认值
            }
        ])
            .then(answers => {
                //结果为一个对象,比如:{name: <input name>}
                this.answers = answers
            })
    }

    writing(){
        const templates = [
            '.browserslistrc',
            '.editorconfig',
            // .... 模板文件路径
            'README.md'
        ]

        templates.forEach(item => {
            //将用户输入信息填入模板文件并复制到目标文件夹下
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}
```

4.测试

```shell
npm link
//新项目目录下
yo myself
```

> 注意：
> 
> 文件模板中使用`<%= name %>`来设置值
> 
> 当与`index.html`的icon中的冲突是,将其icon对应的位置改为`<%%= BASE_URL %>`