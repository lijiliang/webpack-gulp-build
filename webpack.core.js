/**
 * [webpack 构建核心文件]
 * created by LJL
 */
`use strict`;
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //将样式打包成独立的css文件
var extractLESS = new ExtractTextPlugin('css/[name].css');

var opt = {
    output: {
        publicPath: "../",
        filename: 'js/[name].js'
    },
    module: {
        // 加载器
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ],
        postLoaders: [
             {
               test: /\.jsx?$/,
               loaders: ['es3ify-loader']
             }
        ]
    },
    resolve: {
      extensions:["",".js",".jsx"]
    },
    plugins: []
}

module.exports = (env)=>{
    // opt.plugins.push(
    //     new webpack.DefinePlugin({
    //       'process.env':{
    //         'NODE_ENV': JSON.stringify('production')
    //       }
    //     })
    // )
    //
    // //设置这个可以忽略压缩时产生的警告``
    // opt.plugins.push(
    //     new webpack.optimize.UglifyJsPlugin({
    //       compress: {
    //           warnings: false
    //       }
    //     })
    // )
    return opt;
}
