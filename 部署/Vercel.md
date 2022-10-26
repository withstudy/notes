# [Vercel](https://vercel.com)

vercel除了可以部署静态资源外，还可以部署node环境的项目，比如Nuxtjs

1. 在Vercel的旺仔使用GitHub账号登录

2. 全局安装vercel

```npm
npm install vercel -g
```

3. 创建配置文件 now.json 或 vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxtjs/now-builder"
    }
  ]
}
```

4. .nowignore

忽略构建的文件夹 .nuxt
```text
.nuxt
```

5. 发布

* 登录

```shell
vercel login
```

[静态文件部署](https://blog.zwying.com/archives/81.html)
