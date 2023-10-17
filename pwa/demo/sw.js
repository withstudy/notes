const version ='v4'
self.addEventListener('install', async () => {
    console.log('install');
    const cache = await caches.open(version)
    await cache.addAll(['./' , './index.html', './favicon.ico', './manifest.json', './qiyun-logo.png'])

    await self.skipWaiting()
})

self.addEventListener('activate', async () => {
    const cacheList = await caches.keys()
    console.log('activate');
    cacheList.map(async key => {
        if(key !== version) {
            await caches.delete(key)
        }
    })
    await self.clients.claim()
})

self.addEventListener('fetch', async (event) => {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(async response => {
            if(response) {
                return response
            }
            return await fetch(event.request)
        })
    )
})