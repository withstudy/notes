const _this = this;
// 版本
const version = "v3";
// 需要缓存的文件
const cacheFile = [
    "/",
    "/index.html",
    "index.css",
    "index.js"
]

this.addEventListener("install", (event) => {
    this.skipWaiting()
    console.log(event)
    // 添加缓存版本号和具体的缓存文件
    event.waitUntil(
        caches
            .open(version)
            .then((cache) => {
                return cache.addAll(cacheFile)
            })
    )
})

// 拦截客户端请求，我们首先从缓存中读取内容，如果缓存中找不到则继续向服务器请求
this.addEventListener("fetch", async (event) => {
    const { request } = event;
    event.respondWith(
        // 对于请求我们首先会在缓存中查找资源是否被缓存：如果存在，将会返回缓存的资源；
        // 如果不存在，会转而从网络中请求数据，然后将它缓存起来
        caches
            .match(request.clone())
            .then(r => {
                return r || fetch(request).then(function(response) {
                    return caches.open(version).then(function(cache) {
                        cache.put(request, response.clone());
                        return response;
                    });
                })
            })
            .catch(() => {
                return fetch(request.clone()).catch()
            })
    );
});

this.addEventListener("activate", (event) => {
    const wihleList = [version];
    // 对非当前cache version的缓存进行清理
    event.waitUntil(
        caches
            .keys()
            .then((keyList) => {
                return Promise.all(
                    keyList.map((key) => {
                        if (!wihleList.includes(key)) {
                            return caches.delete(key);
                        }
                    })
                )
            })
    )
});
