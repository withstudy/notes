// const webpack = require('webpack')
const webpack = require('../myPack')
const config = require('./webpack.config')

const compiler = webpack(config)
compiler.run((err, stats) => {
    console.log(err)
    console.log(stats.toJson({
        entries: true,
        chunks: false,
        modules: false,
        assets: false
    }))
})
