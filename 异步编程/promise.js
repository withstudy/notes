const fs = require('fs')

function ajax(url){
    return new Promise((resolve,reject) => {
        try {
            const res = fs.readFileSync(url,'utf-8')
            resolve(res)
        } catch (err){
            reject(new Error(err))
        }
    })
}

ajax('./user.json')
    .then(res => {
        console.log(res)
        return ajax('./posts.json')
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })