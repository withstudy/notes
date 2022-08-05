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

function *generator(){
    yield ajax('./user.json')

    yield ajax('./posts.json')
}

const g = generator()

g.next().value.then(res => {
    console.log(res)
    return g.next()
})
.then(res => {
    console.log(res)
})