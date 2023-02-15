const { resolve } = require('path')

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        path: resolve(__dirname,'dist'),
        filename: 'main.js'
    }
}
