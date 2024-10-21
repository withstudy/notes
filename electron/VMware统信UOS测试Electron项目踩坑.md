# VMware 统信UOS 测试 Electron 项目踩坑

## 虚拟机突然没网问题

sudo vim /var/lib/NetworkManager/NetworkManager.state
如果可以看到，网络状态信息NetworkingEnabled=false
* sudo service network-manager stop
* sudo vim /var/lib/NetworkManager/NetworkManager.state
* 将NetworkingEnabled=false改为true（ctr + X 退出编辑）
* sudo service network-manager start

## 运行报错 Permission denied

1. 首先查看项目是否有写入权限，如果没有，则修改权限
```shell
sudo chmod 777 /electron-project
```

## 运行时问题

## 启动程序electron sanbox问题

报错： FATAL: setuid_sandbox_host.cc(158) The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing ...

这是由于Chrome对Linux上的electron程序启用了安全沙箱，而沙箱需要root权限， 需要基于该文件以root权限并且给予4755的特殊权限

```shell
sudo chown root chrome-sandbox && sudo chmod 4755 chrome-sandbox
```

> 注意： chrome-sandbox 换成报错时提示的路径即可