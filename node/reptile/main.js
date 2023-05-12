const express = require('express')
const swig = require('swig')
const reptile = require('./reptile')

const app = express()

app.engine('html',swig.renderFile)
app.set('views', './')
app.set('view engine', 'html')
swig.setDefaults({cache:false})

app.get('/',(req,res) => {
    const url = req.query.url
    if(url){
        reptile(url,(list) => {
            res.render('index',{list})
        })
    }
})


app.listen('8100',() => {
    console.log('connection in 8100')
})