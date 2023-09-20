module.exports = {
    presets: [
        [
            '@babel/preset-env', // 预设包含了es6常用的语法和polyfill
            {
                targets:{
                    // 目标环境
                    browsers: [
                        'last 3 versions',
                        'Android >= 4.4',
                        'iOS >= 9.0',
                    ]
                },
                // useBuiltIns决定引入polyfill的方式
                // false: 全量引入
                // entry: 根据目标环境全量引入
                // usage: 按需加载
                useBuiltIns: 'usage',
                // corejs标准js库
                corejs: '3.6.5'
            }
        ]
    ],
    // @babel/plugin-transform-runtime 包含了@babel/runtime,为转换api时提供一些helpers方法
    // @babel/plugin-transform-runtime 避免重复引入helpers方法 和 污染全局变量
    plugins: [['@babel/plugin-transform-runtime']]
}
