---
title: Nginx 安装与使用
date: 2022-01-06 15:01:27
categories: 服务器
tags: [服务器]
description: 学习总结
cover: https://s2.loli.net/2022/01/06/Bj5oVxJmUfPwYLA.jpg
---

# Nginx 安装与使用

**首先安装一些工具**

```shell
yum install -y wget  
yum install -y vim-enhanced  
yum install -y make cmake gcc gcc-c++  

yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
```

> wget是一个下载文件的工具，它用在命令行下。

> Vim是一个类似于 [Vi](http://baike.baidu.com/subview/27682/6112795.htm) 的著名的功能强大、高度可定制的 [文本编辑器](http://baike.baidu.com/view/487023.htm) 

> g++编译cpp文件

> gcc编译c文件

> make工具可以看成是一个智能的批处理工具，它本身并没有编译和链接的功能，而是用类似于批处理的方式—通过调用makefile文件中用户指定的命令来进行编译和链接的。

> *PCRE*是一个Perl库，包括 perl 兼容的正则表达式库

> *zlib*是提供数据压缩用的函式库

> openssl在计算机网络上，OpenSSL是一个开放源代码的软件库包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连接者的身份。这个包广泛被应用在互联网的网页服务器上

* 第一种方式（推荐）

```js
yum install nginx
//安装后的目录在 /etc/nginx
```

来安装 Nginx，然后我们在命令行中 `nginx -v` 就可以看到具体的 Nginx 版本信息，也就安装完毕了

* 第二种方式

```js
wget http://nginx.org/download/nginx-1.6.2.tar.gz //下载nginx安装包
tar -zxvf nginx-1.6.2.tar.gz -C /usr/local/  //解压nginx-1.6.2.tar.gz到/usr/local/目录下
//进入nginx-1.6.2目录然后在执行./configure命令
[root@MiWiFi-R3-srv nginx-1.6.2]# ./configure --prefix=/usr/local/nginx
//编译安装
[root@MiWiFi-R3-srv nginx-1.6.2]# make && make install
```

**命令**

**nginx -t ** ：验证nginx配置文件是否正确

**netstat -ntlp **：用于显示各种网络相关信息,如网络连接,路由表,接口状态 ，连接,

如果安装启动之后，访问不到，查看服务器得安全组配置，有没有对应得端口

**安装nvm**

```js
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
source   ~/.bashrc    # 安装完毕后，更新配置文件即可使用 nvm 命令
```

[教程](https://www.jianshu.com/p/6660589df806)

[常用命令](https://blog.csdn.net/ruoxiyun/article/details/86980913)
