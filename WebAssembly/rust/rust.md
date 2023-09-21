# rust

## 安装

rust运行是需要C环境的,需要安装 Microsoft C++ 生成工具

如果不想安装 Microsoft C++， 可以下载安装[MSYS2](https://www.msys2.org/)

按照文档中的安装步骤安装即可

最后需要配置gcc的环境变量，我按照[其他文档](https://blog.csdn.net/swallowblank/article/details/120672990)配置的路径没有成功

最后再MSYS2的安装目录搜索`gcc.exe`，然后用所在的bin目录作为环境变量的PATH

* windows 下载rustup-init.sh
[下载](https://www.rust-lang.org/zh-CN/tools/install)

* linux
```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

> 注意：需要配置三个环境变量
> ~/.cargo/bin
> ~/.cargo
> ~/.rustup

## rustup

rustup 是一个命令行工具，它可以作为编译器的工具链。

* 测试你的安装:`rustup -v`
* 检查更新:`rustup check`
* 更新你的安装:`rustup update`
* 查看 Rust 的编译器和包管理器的完整路径:`rustup which rustc`

## Cargo

cargo 类似node的npm，用于管理 projects、crates（rust 包）的命令行

### 常用命令

* `cargo new 项目名 [--lib | --bin]`： 创建新项目
  * `lib`: 创建库
  * `bin`: 创建可执行文件
* `cargo build`： 编译项目
* `cargo run`： 编译并运行项目
* `cargo install 依赖名`: 安装依赖