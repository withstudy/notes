// const fs = require('fs')
// const {Transform} = require('stream')
// exports.default = () => {
//     // 创建读取流
//     const readStream = fs.createReadStream('base.css')
//     // 创建写入流
//     const writeStream = fs.createWriteStream('base.min.css')
//
//     const transform = new Transform({
//         transform:(chunk, encoding, callback) => {
//             // chunk为Buffer，转换为字符串
//             const input = chunk.toString()
//             //去除空格和注释
//             const output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'')
//             callback(null,output)
//         }
//     })
//
//
//     // 将读取的文件流导入写入的文件流
//     readStream
//         .pipe(transform) //转换
//         .pipe(writeStream) //写入
//
//     // 返回stream流可以结束任务
//     return readStream
// }

const {src,dest} = require('gulp')

const cleanCss = require('gulp-clean-css')

exports.default = () => {
    return src('base.css')
        .pipe(cleanCss())
        .pipe(dest('dist'))
}