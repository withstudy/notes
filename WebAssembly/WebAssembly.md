# WebAssembly

[MDN](https://developer.mozilla.org/zh-CN/docs/WebAssembly)

WebAssembly 是一种新的编码方式, 可以让其他语言代码，编译为二进制格式，让其可以运行到web浏览器中

WebAssembly的目标：

* 快速、高效、可移植——通过利用常见的硬件能力，WebAssembly 代码在不同平台上能够以接近本地速度运行。
* 可读、可调试——WebAssembly 是一门低阶语言，但是它有确实有一种人类可读的文本格式（其标准即将得到最终版本），这允许通过手工来写代码，看代码以及调试代码。
* 保持安全——WebAssembly 被限制运行在一个安全的沙箱执行环境中。像其他网络代码一样，它遵循浏览器的同源策略和授权策略。
* 不破坏网络——WebAssembly 的设计原则是与其他网络技术和谐共处并保持向后兼容。

## Rust and WebAssembly

[文档](https://rustwasm.github.io/docs/book/why-rust-and-webassembly.html)

我看很多人说，Rust是WebAssembly最好的良配

主要原因：

* rust打包之后的`.wasm`非常的小
* rust不受JS的垃圾收集暂停的影响

## 初体验

接下来使用Rust来体验一下WebAssembly

### 首先要搭建好rust环境

参看我的[Rust](/WebAssembly/rust.html)文章

### 安装wasm-pack

```shell
cargo install wasm-pack
# OR
npm install -g wasm-pack
```

### 创建项目

在[文档](https://rustwasm.github.io/docs/book/why-rust-and-webassembly.html)中有利用`cargo-generate`获取官方模板来实现的案例

以下是我自己实现的方式

* 创建rust项目
```shell
cargo new demo --lib
```

> 注意必须是`--lib`来创建库项目

* 重写`Cargo.toml`

```rust
[package]
name = "demo"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
wasm-bindgen = "0.2.84"
```

该文件类似`package.json`

* 重写`src/lib.rs`

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-game-of-life!");
}
```

* 使用`wasm-pack`打包

```shell
wasm-pack build --release --target web
```

需要注意的是`--target web`,打包为web使用

打包之后，在目录下会多一个pkg文件夹，结构如下
```txt
pkg/
├── .gitgnore
├── demo_bg.js
├── demo_bg.wasm
├── demo_bg.wasm.d.ts
├── demo.d.ts
└── demo.js
```

* 创建`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebAssembly</title>
</head>
<body>
    <script type="module">
        import initSync, { greet } from './pkg/demo.js';
        
        async function init(){
            await initSync()
            greet()
        }
        init()
    </script>
</body>
</html>
```

然后打开index.html就可以看到弹窗了🎈