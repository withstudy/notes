## 网络-DNS与CDN总结

### 一、DNS

DNS域名解析器，用于将我们访问的网址转换为对应的IP地址。

我们在访问网址时，并不是直接就可以访问到对应的服务器，而是需要通过IP地址来建立连接，但是由于IP是一段段的数字不方便记忆，所以才有了网址的形式。

`域名与IP之间的对应关系，称为"记录"（record）。根据使用场景，"记录"可以分成不同的类型（type）`

>  `A`：地址记录（Address），返回域名指向的IP地址  IPv4。
>
> `AAAA`：地址记录（Address），返回域名指向的IP地址  IPv6
>
>  `NS`：域名服务器记录（Name Server），返回保存下一级域名信息的服务器地址。该记录只能设置为域名，不能设置为IP地址。
>
> `MX`：邮件记录（Mail eXchange），返回接收电子邮件的服务器地址。
>
> `CNAME`：规范名称记录（Canonical Name），返回另一个域名，即当前查询的域名是另一个域名的跳转。
>
> `PTR`：逆向查询记录（Pointer Record），只用于从IP地址查询域名。

* **DNS解析过程**

当在浏览器输入网址（www.baidu.com）时，会经过一下的步骤：

> 一个网址有不同的分级，比如上面的百度网址
>
> 根域名：`.` 上面的网址其实并不是完整的，完整的是`www.baidu.com.root`，每个网址都有一个`.root`的根域名，所以省略了
>
> 顶级域名：`.com`
>
> 次级域名：`.baidu`
>
> 主机域名：`www`

1. 检查浏览器缓存
2. 检查操作系统缓存
3. 检查路由器缓存

如果以上都没有找到对应的IP地址，就会通过DNS来查询

4. 首先查询根域名服务器，如果查询成功会返回根域名`.`的所有NS记录，也就是根域名服务器
5. 然后DNS会向每一个根域名服务器请求，查询`com.`对应的顶级域名服务器NS记录
6. DNS再回向每一个顶级域名服务器请求，查询`baidu.com`对应的次级域名服务器NS记录
7. DNS最后向每一个次级域名服务器请求，查询`www.baidu.com`对应的IP地址，然后返回给浏览器

* **DNS解析过程分类**

DNS解析过程分为递归和迭代

**递归**

类型于`递归函数`，查询由对应的域名服务器查询，而不是本地域名服务器

> 比如：
>
> 查询到了`.`对应的根域名服务器，那么再查找顶级域名时，由对应的根域名服务器去请求查询顶级域名

**迭代**

每次查询都返回对应的IP地址，由本地域名服务器来请求

> 比如：
>
> 查询到了`.`对应的根域名服务器，将对应的IP地址返回给本地域名服务器，再由本地域名服务器来通过IP地址来请求查询顶级域名

* **DNS优化**

因为DNS会向不同的域名服务器发送请求，所以会带来比较大的时间损耗，所以我们可以采用一些方式来优化一下

1. **DNS预解析**

   用户在请求某个链接之前，浏览器先尝试解析该链接的域名再将其进行缓存。这样真正请求的时候就不需要进行DNS解析。
   可以在服务器中响应设置`X-DNS-Prefetch-Control`的值为on启动预解析

   ```html
   <meta http-equiv="x-dns-prefetch-control" content="on">
   ```

   对特定域名预解析

   ```html
   <link rel=”dns-prefetch” href=”//www.baidu.com”
   ```

2. **域名收敛**

   建议将静态资源只放在一个域名下面，可以有效减少dns的请求

* **DDOS 攻击**

在短时间内发起大量请求，耗尽服务器的资源，无法响应正常的访问，造成网站实质下线。

防御方法有：

1. 备份网站
2. HTTP拦截请求
3. 带宽扩容
4. CDN

****

### 二、CDN

CDN内容分发网络，它能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。

典型的CDN系统由下面三个部分组成

- 分发服务系统

  最基本的工作单元就是Cache设备，cache（边缘cache）负责直接响应最终用户的访问请求，把缓存在本地的内容快速地提供给用 户。同时cache还负责与源站点进行内容同步，把更新的内容以及本地没有的内容从源站点获取并保存在本地。Cache设备的数量、规模、总服务能力是衡 量一个CDN系统服务能力的最基本的指标

- 负载均衡系统

  主要功能是负责对所有发起服务请求的用户进行访问调度，确定提供给用户的最终实际访问地址。两级调度体系分为全局负载均衡（GSLB）和本 地负载均衡（SLB）。GSLB主要根据用户就近性原则，通过对每个服务节点进行“最优”判断，确定向用户提供服务的cache的物理位置。SLB主要负 责节点内部的设备负载均衡

- 运营管理系统

  分为运营管理和网络管理子系统，负责处理业务层面的与外界系统交互所必须的收集、整理、交付工作，包含客户管理、产品管理、计费管理、统计分析等功能。

##### CDN的过程

`使用CDN的方法很简单，只需要修改自己的DNS解析，设置一个CNAME指向CDN服务商即可。`

用户访问未使用CDN缓存资源的过程为:

1. 浏览器通过前面提到的过程对域名进行解析，以得到此域名对应的IP地址；
2. 浏览器使用所得到的IP地址，向域名的服务主机发出数据访问请求；
3. 服务器向浏览器返回响应数据

使用CDN后

1. 当用户点击网站页面上的内容URL，经过本地DNS系统解析，DNS系统会最终将域名的解析权交给CNAME指向的CDN专用DNS服务器。
2. CDN的DNS服务器将CDN的全局负载均衡设备IP地址返回用户。
3. 用户向CDN的全局负载均衡设备发起内容URL访问请求。
4. CDN全局负载均衡设备根据用户IP地址，以及用户请求的内容URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。
5. 区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户IP地址，判断哪一台服务器距用户最近；根据用户所请求的URL中携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的IP地址。
6. 全局负载均衡设备把服务器的IP地址返回给用户
7. 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。

##### CDN的优点

1. 本地Cache加速，加快访问速度
2. 镜像服务，消除运营商之间互联的瓶颈影响，保证不同网络的用户都能得到良好的访问质量
3. 远程加速，自动选择cache服务器
4. 带宽优化，分担网络流量，减轻压力，
5. 集群抗攻击
6. 节约成本