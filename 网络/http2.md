# HTTP2

## 特点

1. 采用二进制流传输：http1.x传输使用的是二进制+明文

2. 支持多路复用

3. 支持头部压缩：客户端和服务器都维护一个头部表，请求只发送头部表中没有的

4. 支持服务器推送

5. 支持设置请求优先级

### 多路复用

HTTP/2.0的多路复用（Multiplexing）是一种技术，它允许多个请求/响应在单个TCP连接上并行传输。

这意味着客户端可以一次发送多个请求，服务器也可以一次发送多个响应，而不必等待之前的请求/响应完成后再发送下一个。

这样可以极大地提高网络性能，减少延迟。
