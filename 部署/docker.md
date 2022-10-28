# Docker

## 一. 简介

### 1. 什么是Docker

* Docker 是一个集打包、运行、测试、发布于一体的开放式平台

* 我们可以吧开发过程中的基础设施分离出来部署到Docker
    * DevOps：开发、构建、自动化部署、测试、文档
    * GitLib、Jenkins
    * Nginx、Apache
    * MySQL、MongoDB
    * 文档管理工具yApi
    
* 使用Docker可以避免复杂的应用环境配置，并以秒级的熟读开启
* 支持绝大多数平台，容器的性能开销极低

### 2. 应用场景

* Web应用的自动化打包和发布
* 自动化测试和持续集成、发布
* 在服务型环境中部署和调整数据库或其他的后台应用

### 3. 核心概念

* Docker Daemon守护进程
    * Docker Daemon 是Docker的守护进程
    * Docker Client通过命令行语Docker Damon通信完成Docker相关操作
    
* Docker Client 客户端
    * 通过终端和用户交互
    * 终端中输入指令，Docker客户端吧指令传递给Docker Daemon
    
* Docker Image镜像
    * 可以认为是一个最小版本的Linux心痛的镜像，包含了所需的文件系统和一些配置好的应用
    * 需要通过容器来加载镜像
    * 是静态的，可以和面向对象中类对比
    
* Docker Container 容器
    * 通过镜像创建一个容器
    * 可以创建多个容器，每个容器都会开启一个进程，多个容器质检是相符隔离的
    * 是动态的，可以和面向对象的实例对比
    
### 4。 体系结构

* Docker 使用客户端-服务器(c/s)架构模式，使用远程API来管理和创建Docker容器

![图片](https://img-blog.csdnimg.cn/396572de0dbf4866ad294ef32b15f391.png)

### 5. 和虚拟机的区别

* 虚拟机是硬件级虚拟化，每一个虚拟机内部都要分割系统资源，需要虚拟出虚拟硬件
* Docker 是系统级u你画，容器共享系统资源，不会虚拟出硬件

## 二. 安装Docker

[参考文档](https://docs.docker.com/install/)

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

docker version
# 启动docker
# service 命令的用法
sudo service docker start
# systemctl 命令的用法
sudo systemctl start docker
```

初体验

```shell
# 运行nginx容器
docker run -p 8080:80 --name nginx-demo nginx
# 运行完成之后
# 可以通过docker宿主的IP地址+8080端口访问到启动的nginx服务
```

## 三. 基本使用

### 1. 镜像加速

* 在 /etc/docker/daemon.json文件中设置一下内容

```json
{"registry-mirrors": ["https://almtd3fa.mirror.aliyuncs.com","https://registry.docker-cn.com"]}
```

* 重启docker

### 2. 镜像使用

* 通过Docker Hub网站查找镜像

  * [https://hub.docker.com/](https://hub.docker.com/)
  
* 常用命令

```shell
# 在Docker Hub查找镜像
docker search nginx
# 查看本地镜像
docker images

# 获取一个镜像
# 如果指定镜像版本 nginx:latest，默认就是最新版本
docker pull nginx

# 删除镜像
docker rmi nginx-demo

## 为镜像设置一个新的tag
docker tag [镜像id] [用户名]/[镜像名]:[tag]
```

### 3. 容器使用

* 使用镜像创建一个容器

```shell
# 以 centos 镜像启动一个容器
# 参数说明：
#   -i 交互式操作   -t 终端
#   centos 镜像名称   /bin/bash  镜像运行以后执行的命令 打开终端
docker run -it centos /bin/bash

# 不同镜像的用户是不一样的，启动镜像的参数也不同
# 参数说明：
#     -d 后台运行，  --name  nginx-server  容器名称
# 说明： -p 映射容器中的端口，宿主机端口：容器端口，nginx 镜像名称
docker run -d --name nginx-server -p 9090:90 nginx
```

* 常用命令

```shell
# 查看所有容器
# 不加 -a 只查看运行中的容器
docker ps -a

# 查看运行中容器的状态
docker stats

# 启动容器 参数可以是容器id 或者容器名称
docker start nginx-server

# 停止，重启，删除容器
docker stop nginx-server
docker restart nginx-server
docker rm -f nginx-serve

# 清除所有终止的容器
docker container prune

# 进入容器
docker exec -it nginx-server /bin/bash

# 查看容器内部的日志
docker logs -f nginx-server
```

## 三. 安装yapi

[https://hub.docker.com/r/jayfong/yapi](https://hub.docker.com/r/jayfong/yapi)

```shell
docker run --rm 0d 0p 40001:3000 jayfong/yapi:play
# 默认的管理员账号：adming@docker.yapi,管理员密码:adm1n
```

## 四. 容器部署vuejs项目

* 创建Dockerfile

在vuejs项目的根文件夹下创建Dockerfile文件，并输入一下内容

```dockerfile
# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY ..
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from-build-satge /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
```

* 使用Dockerfile

```shell
# 创建镜像
docker build --rm -t deploy-web:v1.0 .

# 编译过程中如果遇到 npm install 的时候无法解析npm的地址，可以使用宿主机的network
docker network ls 
docker build --network host --rm -t deploy-web:v1.0 .

# 运行容器
docker run -itd --name web -p 88:80 deploy-web:v1.0
```

**运行完成之后就可以打开浏览器测试了**

## 五. Docker Hub

[https://hub.docker.com/](https://hub.docker.com/)

* 首先登录到Docker Hub

```shell
docker login

# 从容器创建一个新的镜像
docker commit [镜像id] goddlts/web:v1.1

# 镜像上传到 hub
docekr push goddlts/web
```

## 六. 映射配置目录和网站根目录

* 映射配置目录和网站根目录

```shell
# 复制之前容器中的 nginx配置文件，吧容器中的配置目录nginx拷贝到当前目录
docker cp web:/etc/nginx .
```\


```shell
docker run -itd \
  --name web-web \
  --volume /home/mypro:/usr/share/nginx/html \
  --volume /home/nginx:/etc/nginx \
  -p 89:80 \
  deploy-web:v1.0
```
> 如果在cp 的时候提示权限问题，使用一下命令更改权限
> 
> windows 下如果提示`A required privilege is not held by the client.`
> 
> 需要使用管理员权限在项目目录下运行命令
```shell
# 更改权限
chmod -R 777 .
```
