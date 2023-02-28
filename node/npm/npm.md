# npm

npm 是node的默认包管理器

npm 管理了许多的包，当我们安装依赖时，它会将远端的包克隆到本地

## 安装流程

1. 查找npm配置

npm配置包括了其安装的源信息，在安装时需要先找到配置文件`.npmrc`

首先在项目目录下找，没有再到全局去找，如果还没有就使用npm内置的

2. 构建依赖树

检查是否有`package-lock.json`文件

如果有，就与`package.json`中依赖的版本对比是否一直，如果不一致就使用npm的信息，一致就使用lock中的信息

如果没有，就根据`package.json`文件生成依赖树

3. 下载资源

根据依赖图下载资源

默认下载到项目的`node_modules`文件夹中

4. 生成`package-lock.json`文件

该文件记录了本次安装的依赖具体版本，待其他人再安装时不会安装了其他不一样的版本

## 依赖树

不同的npm版本生成的依赖包不一样

### npm2.x

该版本使用循环遍历，项目管理自己的依赖，依赖也管理自己的子依赖

导致当不同的依赖同时拥有相同依赖或者循环依赖的时候，每个依赖都有自己的`node_modules`文件夹，就会安装冗余

导致`node_modules`文件夹体积庞大

### npm3.x

该版本采用扁平化管理依赖

比如项目依赖A、B，A、B同时又依赖了C，这时候C不在A、B的`node_modules`文件夹，而是提升到了项目的依赖中

> node_modules[A, B, C]

但是当安装相同依赖不同版本时，不同的依赖安装顺序会导致生成的依赖树不相同

比如: A、B依赖D（v0.0.1），C也依赖D（v0.0.2）

如果先安装A、B，生成的依赖图是

> node_modules[A, B, D（v0.0.1）, C[node_modules[D（v0.0.2）]]]

如果先安装C，生成的依赖图是

> node_modules[A[node_modules[D（v0.0.1）], B[node_modules[D（v0.0.1）], D（v0.0.2）, C]]

相同的依赖还是安装了两次

### npm5.x

新增了`package_lock.json`文件

只要该文件相同，生成的依赖图就一定是相同的

并且其保存了每个包具体的版本信息和下载链接，这就不需要再去远程仓库进行查询，优先会使用缓存内容从而减少了大量的网络请求

## 缓存机制

执行 `npm config get cache` 命令，得到的缓存文件的路径

在 cache 文件夹中，在 content-v2 和 index-v5 两个文件夹中都是一些 2 位字符的文件夹

content-v2 文件是用来存在缓存包的具体内容，index-v5 是用来存储依赖包的索引，根据 index-v5 中的索引去 content-v2 中查找具体的源文件 。

`package_lock.json`中的依赖信息如下

```json
"lodash":{
  "version": "4.17.21",
  "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
  "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
}
```
pacote:range-manifest:{url}:{integrity} 规则生成出唯一的 key

然后用这个 key 通过 SHA256 加密算法得到一个 hash。这个 hash 对应的就是 _cache/index-v5 中的文件路径

前 4 位 hash 用来区分路径，剩下的几位就是具体的文件名。文件的内容就是该缓存的具体信息了。

