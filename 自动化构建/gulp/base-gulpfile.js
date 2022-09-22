exports.foo = done => {
    console.log('foo task~')
    done()
}

exports.default = done => {
    console.log('default task~')
    done()
}

const {series,parallel} = require('gulp')

const task1 = done => {
    setTimeout(() => {
        console.log('task1 msg~')
        done()
    },1000)
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 msg~')
        done()
    },1000)
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 msg~')
        done()
    },1000)
}
// 串行执行各个任务
exports.series = series(task1,task2,task3)
// 并行执行各个任务
exports.parallel = parallel(task1,task2,task3)