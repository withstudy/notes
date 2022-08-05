---
title: HTTPS解决的问题
date: 2021-09-09 13:08:20
categories: http
tags: [http]
description: 有了大家熟悉的HTTP之后，为什么还会诞生HTTPS呢？ 那是因为HTTP存在很多问题，比如：无状态、不安全等 而HTTPS不是一个新的协议，其实只是相当对HTTP安全的一个升级。在介绍HTTPS之前先介绍一下HTTP存在的安全问题。
cover: https://i.loli.net/2021/09/09/G1PReNVLltUcMmX.jpg
---

### HTTPS解决的问题

有了大家熟悉的HTTP之后，为什么还会诞生HTTPS呢？

那是因为HTTP存在很多问题，比如：无状态、不安全等

而HTTPS不是一个新的协议，其实只是相当对HTTP安全的一个升级。在介绍HTTPS之前先介绍一下HTTP存在的安全问题。

* 明文传输
* 不知道服务器是不是我们要请求的服务器（中间人攻击）
* 客户端和服务器拿到对方的数据是不是真实，有可能被黑客获取修改了

而HTTPS就解决了这些问题。主要解决的方式如下：

1. 数字证书

数字证书主要解决了确认请求的服务器是安全的。数字证书是由一些官方机构发放的，当然是需要收费的。在建立HTTPS连接的时候，客户端向服务器发送请求，服务器会把自己的数字证书发送给客户端，客户端拿到之后，浏览器会自动去验证这个证书的真实性，如果证书是假的，那么浏览器就会报错，也就是我们常看到的浏览器提示该网站不安全。如果证书验证通过，客户端就可以继续发送请求。

2. 密文传输

密文传输肯定就是解决明文传输的问题了，那它是怎么加密的呢？在此之前先介绍一下对称加密和非对称加密。

* 对称加密

通过名字就可以看出，对称加密其实就是使用同一个密钥进行加密或解密。服务器使用私钥将数据加密，然后将加密后的数据和密钥一起发送给客户端，客户端在使用解密数据使用。其实大家既可以发现这种加密方式很不安全，一旦黑客截取到了这个私钥，那么就可以拿到数据。所以就有了非对称加密。

* 非对称加密

非对称加密就是使用私钥加密，就只能用公钥解密，同理，用公钥加密就只能使用私钥解密。服务器先将公钥发送给客户端，然后使用私钥将数据加密，然后将加密的数据和公钥同时传送到客户端。这样就算黑客截取到数据，没用公钥也就拿不到数据。但是还是有风险，服务器把公钥发送给客户端的时候，同样由被截取的风险，那么怎样才能安全的将公钥送到客户端呢？

这个时候就是HTTPS登场了，HTTPS的加密方式结合了两种加密方式，首先使用非对称加密将对称加密要使用的密钥发送给服务器。具体流程如下：

> 首先服务器将公钥发送给客户端
>
> 客户端生成一个对称加密的密钥，然后使用服务器的公钥将密钥加密，发送给服务器
>
> 服务器再通过自己的私钥解密拿到密钥
>
> 然后接下来的传输数据就使用这个密钥进行传输

但是将才说了，公钥传送给客户端是有被截取的风险的，那怎样才能安全的将公钥传送给客户端呢？

这就要用到我们说的数字证书了，数字证书不是为了确认服务器的真实性嘛，那我就把公钥放在这个数字证书中，这样服务器既能证明自己的身份，又能将公钥传送到客户端。然后客户端就可以按照之前的流程继续操作了。

3. 数字签名

还有最后一个问题就是数据再传输的过程中可能被黑客截取修改，这个时候就使用到了数字证书，服务器通过将数据某个加密算法计算出一个摘要，然后将这个摘要一起发送到客户端，客户端拿到数据之后，再使用同样的加密算法计算出数据的摘要，然后和服务器发送过来的摘要进行比对，如果相同说明没有被修改，相反，那个这个数据就已经被修改了。

#### 总结

HTTPS的诞生主要是为了解决HTTP存在的一些安全问题，当然HTTPS虽然解决了这些问题，但是也是有代价的，他的连接速度没有HTTP快，当然这种连接速度是可以接受的，还有就是数字证书是需要申请和收费的。
