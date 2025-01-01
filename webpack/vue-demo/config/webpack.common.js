const { resolve } = require('path')
const { merge } = require('webpack-merge')
const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DefinePlugin = require('webpack').DefinePlugin
const CopyPlugin = require('copy-webpack-plugin')
const EslintWebpackLint = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const configDev = require('./webpack.development')

const configProd = require('./webpack.production')

const configCommon = {
    entry: './src/main.js',
    output: {
        path: resolve(process.cwd(),'dist'),
        filename: 'js/main.js',
        assetModuleFilename: 'assets/[name]_[hash][ext]'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: "asset",
                generator: {
                    filename: "images/[name]_[hash][ext]", // 独立的配置
                }
            },
            {
                test: /.(less|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            esModule: false
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve:{
        extensions: ['.vue', '.js', 'css'],
        alias: {
            '@': resolve(process.cwd(), 'src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(process.cwd(),'public/index.html'),
            filename: 'index.html',
            title: 'vue'
        }),
        new DefinePlugin({
            BASE_URL: "''"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,'../public'),
                    globOptions:{
                        ignore:[
                            '**/index.html'
                        ]
                    }
                }
            ]
        }),
        new EslintWebpackLint({
            context: path.resolve(__dirname,'src')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}

module.exports = (env) => {
    const config = env.produciton ? configProd : configDev

    return merge(configCommon,config)
}
