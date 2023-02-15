const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(), // js压缩
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            miniSize: 100,
            cacheGroups: {
                libs: { // 第三方库
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
                vue: { // vue 单独拆包
                    name: "chunk-vue",
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: 20 // 权重要大于 libs
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2, // common 组的模块必须至少被 2 个 chunk 共用 (本次分割前)
                    priority: 0,
                    chunks: 'initial', // 只针对同步 chunk
                    reuseExistingChunk: true, // 复用已被拆出的依赖模块，而不是继续包含在该组一起生成
                }
            }
        }
    }
}
