const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: process.cwd(),
    mode: 'development',
    devtool: 'none',
    entry: './src/index.js',
    output:{
        path: path.resolve('dist'),
        filename:'bundle.js'
    }
}
