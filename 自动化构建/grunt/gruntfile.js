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
    // 返回false，表示任务失败，在执行多个任务时，会停止执行后续任务
    grunt.registerTask('default',() => {
        console.log('default task~')
        // return false
    })
    // 第二参数为数组，执行多个任务
    grunt.registerTask('many',['foo','bar'])
    // 异步任务
    // 调用this.async获得一个函数，在异步任务执行完成之后调用，表示执行完毕了
    grunt.registerTask('async',function (){
        const done = this.async()
        setTimeout(() => {
            console.log('async task~')
            // 异步任务通过在调用时传递一个false，表示任务失败
            // done(false)
        },1000)
    })

    // 初始化配置
    grunt.initConfig({
        init:{
            msg:'init msg~'
        }
    })
    // 在任务中，可以通过grunt.config拿到初始化的数据
    grunt.registerTask('init',() => {
        console.log(grunt.config('init.msg'))
    })

    // 多目标任务
    grunt.initConfig({
        build:{
            options:{
                msg:'multi msg~'
            },
            css:'css',
            js:{
                options:'js'
            }
        }
    })
    // 使用registerMultiTask可以多目标任务
    // 多目标任务必须初始化一个同名配置，配置中每一个字段就是一个任务，除了字段名为options
    // this.options()为多目标任务的初始化数据，在任务中可以通过options拿到数据
    // this.target可以拿到子任务的名称
    // this.data可以拿到子任务的数据
    grunt.registerMultiTask('build',function (){
        console.log(`options:${this.options().msg},target:${this.target},data:${this.data}`)
    })

    // 使用插件
    // 1.安装插件（grunt-contrib-clean：清除生成的文件）
    // 2.使用grunt.loadNpmTasks加载插件任务
    // 3.根据插件初始化配置
    // 4.执行任务
    grunt.initConfig({
        clean:{
            temp: 'temp/*.js'
        }
    })

    grunt.loadNpmTasks('grunt-contrib-clean')
}