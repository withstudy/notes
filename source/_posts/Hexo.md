 ---
title: hexo+github 搭建静态博客
date: 2021-11-24 11:06:32
categories: hexo
tags: [hexo]
description: 学习总结
---

## hexo+github 搭建静态博客

### 1、准备工作

在开始一切之前，你必须已经：

* 有一个github账号，没有的话去注册一个；
* 安装了node.js、npm，并了解相关基础知识；
* 安装了git for windows（或者其它git客户端）

### 2、创建仓库

新建一个名为你的用户名.github.io的仓库，比如说，如果你的github用户名是test，那么你就新建test.github.io的仓库（必须是你的用户名，其它名称无效），将来你的网站访问地址就是 http://test.github.io 了.

### 3、配置SSH key

为什么要配置这个呢？因为你提交代码肯定要拥有你的github权限才可以，但是直接使用用户名和密码太不安全了，所以我们使用ssh key来解决本地和服务器的连接问题。


`$ cd ~/. ssh `#检查本机已存在的ssh密钥

如果提示：No such file or directory 说明你是第一次使用git。

`ssh-keygen -t rsa -C "邮件地址"`

然后连续3次回车，最终会生成一个文件在用户目录下，打开用户目录，找到.ssh\id_rsa.pub文件，记事本打开并复制里面的内容，打开你的github主页，进入个人设置 -> SSH and GPG keys -> New SSH key：

将刚复制的内容粘贴到key那里，title随便填，保存。

### 4、使用hexo写博客

安装

`$ npm install -g hexo`

初始化

`$ cd /f/Workspaces/hexo/
$ hexo init`

`hexo s`是开启本地预览服务，打开浏览器访问 http://localhost:4000 即可看到内容

### 5、上传

如果你一切都配置好了，发布上传很容易，一句hexo d就搞定，当然关键还是你要把所有东西配置好。

首先，ssh key肯定要配置好。

其次，配置_config.yml中有关deploy的部分：

正确写法：

`deploy:
  type: git
  repository: git@github.com:liuxianan/liuxianan.github.io.git
  branch: master`

  ### 6、hexo常用命令

  `hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本`

`hexo s -g #生成并本地预览
hexo d -g #生成并上传`

### 7、创建博客

在项目文件中找到source => _posts,在该文件夹下创建.md的文档,格式如下:

```
title: postName #文章页面上的显示名称，一般是中文
date: 2013-12-02 15:30:16 #文章生成时间，一般不改，当然也可以任意修改
categories: 默认分类 #分类
tags: [tag1,tag2,tag3] #文章标签，可空，多标签请用格式，注意:后面有个空格
description: 附加一段文章摘要，字数最好在140字以内，会出现在meta的description里面
```

以下是正文



相关语法参考:https://www.runoob.com/markdown/md-tutorial.html