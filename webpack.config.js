const path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    {
        CleanWebpackPlugin
    } = require('clean-webpack-plugin')


// webpack所有的配置信息都写在module.exports里
module.exports = {
    // this.指定入口文件
    entry: "./src/main.ts",

    // 打包文件所在目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    mode: 'development',
    devtool: false,

    // 指定webpack打包时用到的模块
    module: {
        // 指定加载规则
        rules: [{
                // test指定规则生效的文件,这里指定.ts后缀名的文件
                test: /.ts$/,
                // 要使用的loader,从后面的先开始执行
                use: [
                    // 配置babel,以兼容低版本浏览器
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的浏览器
                                        targets: {
                                            "chrome": "88",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本,才可转换处理promise等语法
                                        "corejs": "3",
                                        // 使用corejs的方式，usage表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }

                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/,
            },
            // 设置less文件的处理
            {
                test: /.less$/,
                // use从下往上执行
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss,兼容低版本浏览器
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 "postcss-preset-env",
                    //                 {
                    //                     browsers: "last 2 versions"
                    //                 }
                    //             ]
                    //         }
                    //     }
                    // },
                    "less-loader",
                ]
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title配置网页标题
            // title:'模板'
            template: "./src/main.html"
        }),
    ],

    // 设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}