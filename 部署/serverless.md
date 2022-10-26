# ServerLess

## 一、介绍

1. Serverless 是一种架构模式，无服务器架构

* 对于使用Serverless架构进行开发的项目，开发者最明显的感受是更关注应用的业务本身

2. 无服务器，并不是真的没有服务器，只是开发人员不需要关注服务器

3. 我们的应用主要由两大块组成，分别是逻辑语存储，Serverless中国就通过两种方式解决了这两块的问题

* 函数及服务，Function as a Service, FaaS;

* 后端及服务, Backend as a Service, Baass

4. Serverless的优势

* 不需要再考虑什么物理机、须立即，结合工作流的情况下，代码提交自动部署，直接运行

* 没有服务器，维护成本自然大大降低，安全性稳定新更高

* 都是弹性伸缩云，硬件资源需要多少分配多少，不用单行性能问题

5. Vercel Serverless 文档

* [https://vercel.com/docs](https://vercel.com/docs)

## 二、使用

1. 全局安装vercel

```shell
npm install vercel -g
```

2. 创建项目
```text
- demo
    - api
        -hello.js
    - package.json
```

3. 运行项目

开发环境运行
```shell
vercel dev
```

生产环境运行
```shell
vercel
```

