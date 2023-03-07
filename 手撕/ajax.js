function request(method, url, header = {}, params = {}){
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onreadystatechange = e => {
            if(xhr.readyState === 4){
                if(xhr.status >= 200){
                    resolve(JSON.parse(xhr.responseText))
                }else {
                    reject('请求错误')
                }
            }
        }
        // 添加请求头
        for(let key in header){
            if(Reflect.has(header,key)){
                xhr.setRequestHeader(key, header[key])
            }
        }
        // 处理请求参数
        const data = []
        for(let key in params){
            if(Reflect.has(params,key)){
                data.push(`${key}=${params[key]}`)
            }
        }
        xhr.send(data.join('&'))
    })

}