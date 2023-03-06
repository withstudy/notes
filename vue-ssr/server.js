import { createApp } from './app.js'
import { renderToString } from 'vue/server-renderer'
import express from 'express'
import fs from 'fs'

const server = express()

server.get('/',(req,res) => {
    const app = createApp()
    const template = fs.readFileSync('./index.html','utf-8')
    renderToString(app).then(html => {
        template.replace('<!--vue-ssr-->',html)
        res.end(template)
    })
})

server.use(express.static('.'))

server.listen(3000,() => {
    console.log('server start')
})
