# 安装MySql8

## 安装

### 1. 配置yum仓库

```shell
# 更新密钥
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# 安装MySQL版本 yum库
rpm -Uvh https://repo.mysql.com//mysql80-community-release-el7-3.noarch.rpm
```

### 2. 使用yum安装mysql

```shell
yum -y install mysql-community-server 
```

### 3. 启动MySQL

```shell
# 启动mysql服务
systemctl start mysqld.service
# 设置开机自启动
systemctl enabel mysqld.service
```

## MySQL配置

### 1.查看初始密码

```shell
cat /var/log/mysqld.log | grep password
```

### 2. 登录MySQL

```shell
mysql -uroot -p
```

### 3. 修改密码

第一次登录必须先修改密码

```shell
ALTER USER 'root'@'localhost' IDENTIFIED BY 'fJO447hZ/Dve';
```

### 4. 设置密码等级

```shell
# 查看密码检验信息
SHOW variables LIKE 'validate_password%';

# 设置密码等级为低
set global validate_password.policy=0;

# 设置密码最小长度
set global validate_password.length=6;
```
### 5. 配置远程登录

```shell
# 第一次设置远程登录
create user "root"@"%" IDENTIFIED WITH mysql_native_password BY "654321";
# 修改远程登录密码
ALTER USER "root"@"%" IDENTIFIED WITH mysql_native_password BY "654321";
```

[参考](https://www.cnblogs.com/werr370/p/14633785.html)
