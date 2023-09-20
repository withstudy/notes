const fs = require('fs')

async function ajax(url){
    return new Promise((resolve,reject) => {
        try {
            fs.readFile(url,'utf-8',
                (err,res) => {
                    if(err) reject(err)

                    resolve(res)
                }
            )
        } catch (err){
            reject(new Error(err))
        }
    })
}

async function getData(){
    const users = await ajax('../user.json')
    console.log(users)
    const posts = await ajax('../posts.json').then(res => res)
    console.log(posts)
}

getData()