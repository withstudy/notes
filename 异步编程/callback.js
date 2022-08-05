const fs = require('fs')

function ajax(url,callback){
    try {
        const res = fs.readFile(url,'utf-8',callback)
    } catch (err){
        callback(new Error(err),err)
    }
}

const callback = function (err,res){
    console.log(res)
    ajax('./posts.json',(err,res) => {
        console.log(res)
    })
}
ajax('./user.json',callback)