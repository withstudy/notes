# DVWA靶场

## 环境准备

### 1. 使用`kali`镜像

### 2. 安装`apache2`,`mariadb`,`php`

```shell
apt install apache2 -y
apt install mariadb-client mariadb-server -y
apt install php php-pear libapache2-mod-php php-mysql php-curl php-json php-cgi php-gd -y

systemctl start apache2 & systemctl enable apache2
systemctl start mariadb & systemctl enable mariadb
```

## DVWA配置

### 1. 下载

[DVWA](https://codeload.github.com/digininja/DVWA/zip/refs/heads/master)


### 2. 将DVWA安装到`/var/www/html`目录中

```shell
unzip DVWA-master.zip /var/www/html/dvwa
```

### 3. 打开DVWA页面

`http://[ip]/dvwa`

### 4. 根据页面提示修改配置

* 开启报红的配置项
```shell
cd /var/www/html/dvwa/config
cp config.inc.php.dist config.inc.php
vim config.inc.php
```

* 根据提示给权限
```shell
cd /var/www/html/dvwa
chown 777 hackable/uploads
chown 777 config
```

* mysql给权限
* 
根据`config.inc.php`的mysql相关配置，创建user表，并给权限

```shell
# 进入mysql
mysql
# 创建用户表
create user 'dvwa'@'localhose' IDENTIFIED BY '123456';
# 给权限 dvwa 用户设置的密码为123456（这里为了简单起见，就是这个）
GRANT ALL PRIVILEGES ON *.* to 'dvwa'@'localhost';
# 刷新权限
flush privileges;
# 退出mysql
exit

#重启apache2和mariadb
systemctl restart apache2 & systemctl restart mariadb
```