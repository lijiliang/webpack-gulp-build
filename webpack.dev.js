/**
 * [webpack dev开发模式]
 * created by LJL
 */
'use strict';

const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //将样式打包成独立的css文件
const config = require('./config.json');

const staticUrl = '/debug/';
const srcPath = config.path.src;
const appJsPath = config.appJsPath;



module.exports = (file)=>{
    var _name,extractLESS,srcDir,opt = {};
    // console.log(file)
    opt.devtool = 'source-map';  // 生成sourcemap,便于调式
    opt.watch = true;

    if(file){
        //处理名称
        file = file.replace(/\\/g,'/');
        var _name = file.replace(/\.js(x?)$/,'');
        _name = _name.replace(/\//g,'_');

        var extractLESS = new ExtractTextPlugin('css/' + _name + '.css');
        var srcDir = `./${srcPath}/js/${appJsPath}/`;
        opt.entry =  srcDir + file;   // 多文件入口
        opt.output = {
            filename: 'js/' + _name + '.js',    // 根据入口文件输出的对应多个文件名
            chunkFilename: 'js/' + _name + '.js'
        }
        console.log(srcDir + file)
    }else{
        extractLESS = new ExtractTextPlugin('css/[name].css');
        opt.output = {
            filename: "js/[name].js",
            chunkFilename: "js/[name].js"
        };
    }

    // webpack 模块配置
    opt.module = {
        //webpack的处理顺序是perLoaders - loaders - postLoaders
        //loaders执行之前处理的操作

        loaders: [
            {
                test: /\.less$/,
                loader: extractLESS.extract(
                    'css?sourceMap!' +
                    'autoprefixer?browsers=last 5 versions!'+
                    'less?sourceMap'
                )
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: "file?name=fonts/[name].[ext]"
            },
            {
                test: /\.jsx?$/,
                loader: "babel",
                query: {
                  presets: ['es2015']
                }
            }
        ]
    };

    // 插件
    opt.plugins = [
        extractLESS
    ]

    return opt;
}
