/**
 * [webpack 生成核心文件]
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
    }
}

module.exports = (env)=>{

    return opt;
}
