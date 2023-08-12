# Flutter

[官网]<https://flutter.cn>

## 一. 安装（mac环境）

### 1. 安装flutter
* 从官网下载flutter
* 配置环境变量
```shell
vim ~/.bash_profiles
# 在文件中添加以下
# 使用镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
# 添加 环境变量
export DART_SDK_PATH=/usr/local/flutter/bin/cache/dart-sdk/bin
export PUB_CACHE_PATH=/usr/local/flutter/.pub-cache/bin
export FLUTTER_PATH=/usr/local/flutter/bin
export PATH="$FLUTTER_PATH:DART_SDK_PATH:PUB_CACHE_PATH:$PATH"
# 更新环境里变量 
source ~/.bash_profile
```
* 检查是否安装成功
```shell
flutter doctor
```

### 2. 安装Xcode
* 在App Store中下载Xcode
* 同意Xcode协议
```shell
sudo xcodebuild -license
```
* 配置
  Seetings => Localtions => Command Line Tools => 选择一项
* 打开ios模拟器
```shell
open -a Simulator
```

## 二. 创建项目
* 使用命令创建
```shell
flutter create my-app
```
* 使用VsCode打开项目
* 运行项目（先打开模拟器）
```shell
flutter run
```
> 项目热更新：
> 1. 使用命令运行，代码修改之后，在控制台中输入‘r’，模拟器会更新
> 2. 使用VsCode运行，运行 => 启动调试，代码修改之后保存会模拟器会更新

> windows 下，需要java环境、安装Andorid Studio, 然后通过其安装模拟器
