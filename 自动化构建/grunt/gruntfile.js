module.exports = grunt => {
    // 基本任务
    grunt.registerTask('foo',() => {
        console.log('foo task~')
    })
    // 第二参数为字符串，为描述字符
    grunt.registerTask('bar','这是描述',() => {
        console.log('bar task~')
    })
    // 默认任务，执行时不跟任务名称，默认执行的任务
    grunt.registerTask('default',() => {
        console.log('default task~')
    })
    // 第二参数为数组，执行多个任务
    grunt.registerTask('many',['foo','bar'])
    // 异步任务
    // 调用this.async获得一个函数，在异步任务执行完成之后调用，表示执行完毕了
    grunt.registerTask('async',function (){
        const done = this.async()
        setTimeout(() => {
            console.log('async task~')
            done()
        },1000)
    })
}