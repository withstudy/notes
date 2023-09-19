# CI/CD: jenkins + github

## 环境准备

* java
* docker

## 安装jenkins

```shell
docker run \
  -itd \
  -u root \
  -p 8080:8080 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  --name jenkins-master \
  jenkins/jenkins

docker logs jenkins-master # 查看初始密码 
```

## github配置

* 生成token，必须勾选repo和admin:repo-hook


## 配置jenkins

* 进入jenkins系统管理->插件管理中->高级选项卡->升级站点，使用清华源：

```txt
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/current/update-center.json
```
* 添加插件Publish over SSH(推送到远程的web服务器)、NodeJs Plugin
* 系统管理->凭据- >创建secret text凭据,Secret 填github的token
* 创建Username with password凭据，填github的token
* 系统管理->系统配置->github->创建github服务器->凭据选择上面创建的secret text凭据
* 创建任务
  * 选择自由风格项目
  * General选择GitHub项目->填写项目github地址
  * 源码管理选择Git->填写github的地址->凭据选择创建的Username with password凭据->选择部署的分支->源码库浏览器选择githubweb->填入github项目地址
  * 构建触发器选择GitHub hook trigger for GITScm polling
  * 构建环境选择Provide Node & npm bin/ folder to PATH->选择配置的node版本
  * Build Steps选择执行shell->输入如下shell
  ```shell
    node -v
    npm install
    npm run build
    if [ "$(docker inspect -f '{{.State.Running}}' nginx)" = "true" ]; then
        docker stop nginx && docker rm nginx;
    fi

    docker run -itd --name nginx -v `pwd`/dist:/usr/share/nginx/html -p 20000:80 nginx
  ```

参考：

[gitee](https://blog.csdn.net/weixin_46034375/article/details/127572547)

[持续集成与持续部署](https://www.jianshu.com/p/6bcb2853fae2)
[在服务器部署Jenkins同步github代码](https://blog.csdn.net/qq_45339526/article/details/130636111)
[jenkins + GitHub 手把手教你实现项目及自动化部署](https://www.bilibili.com/read/cv16633755)