## Webpack Plugin详解

PlugIn (插件) 系统是 Webpack 世界中最重要又最难以理解的概念，理解 Plugin 原理将有助于更灵活地使用 Webpack

### 一、基本概念

#### 1、Tapable

Webpack的打包过程就是一个黑盒，你只需要写好配置，就能从入口文件开始将所有的依赖打包在一起，最后给你一个结果。

而我们对打包的过程是不清楚的，Webpack提供了插件机制，让我们可以在打包的过程中，做一些自己的操作，而这个机制的原理就是订阅发布模式。Webpack向外透露出不同阶段的钩子，然后让我们可以传入要做的操作，Webpack在打包的过程中就会去执行。

Tapable就是提供这个钩子的一个内部库，提供了基于发布订阅模式（观察者模式或事件流）的架构。

#### 2、Compiler

Compiler 是 Webpack 的编译器对象，它主要负责主流程运作，在 Webpack 启动时通过 `new` 实例化，接收所有配置文件中的配置项（entry，output，module，plugin等），并实例化 Compilation 对象开启编译流程，它的生命周期就是 Webpack 整个运行时期。

Compiler是**全局唯一**的。

#### 3、Compilation 

Compilation 负责每一次版本的编译构建和资源生成流程中的细节，在 Compiler 对象的生命周期内（即 Webpack 运行时）可能有多次编译流程，比如常用的开发环境下，文件内容变更会引起重新编译。

**Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等**。当 `Webpack` 以开发模式运行时，每当检测到一个文件变化，一次新的 `Compilation` 将被创建。



**Compiler和Compilation都继承于Tapable，也就是说它们都有自己的钩子**

#### 基本使用

```js
<instance>.hooks.<hook name>.<tap API>('<plugin name>', callback )
```

- `instance` 即为 `compiler` 或 `compilation` 对象的实例引用
- `hook name` 是需要挂载钩子的名称，通过查阅 官网文档 获取所有对外暴露的事件钩子名称、触发时机、类型、注入参数

- `tap API` 有三种：

- - `tap` 用于挂载一个同步回调，适合任何事件钩子类型
  - `tapAsync` 用于挂载一个异步回调，不能对同步类型钩子使用，回调中会注入 `callback` 供插件处理完操作后调用，如果不调用 `callback` 流程将无法继续进行

- - `tapPromise` 和 `tapAsync` 的作用和限制类似，不同在于要求返回一个 `Promise` 实例，并且这个 `Promise` 一定会被决议（无论 resolve 或 reject ）

### 二、自定义Plugin

#### fileList.md案例

在每次`webpack`打包之后，自动产生一个打包文件清单，实际上就是一个`markdown`文件，上面记录了打包之后的文件夹`dist`里所有的文件的一些信息。

```js
class No2Plugin {
    constructor(options){
        this.options = options;
        this.fileName = options.fileName;
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync('No2',(compilation,callback)=>{
            //获取文件数量
            const len = Object.keys(compilation.assets).length;
            let content = `# 一共有${len}个文件\n\n`;
            //遍历文件列表获取文件名称
            for (let filename in compilation.assets){
                content += `- ${filename}\n`;
            }
            //保存md文件
            compilation.assets[this.fileName] = {
                source:function (){
                    return content;
                },
                size:function () {
                    return content.length;
                }
            }
            callback();
        })
    }
}

module.exports = No2Plugin;
```



![1.png](https://i.loli.net/2021/11/11/SNYU1GjCaqJxZQ9.png)

