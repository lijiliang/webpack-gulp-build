/**
 * [webpack pro生产模式]
 * created by LJL
 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //将样式打包成独立的css文件
//const AssetePlugin = require('assets-webpack-plugin');
const MapPlugin = require('map-webpack-plugin');
const config = require('./config.json');

const distPath = config.path.dist;
const staticUrl = '/dist/';
var extractLESS = new ExtractTextPlugin('css/[name].[chunkhash:6].css');
var nameStr = '[name].[hash:6]';

//输出map.json
const mapPluginInstance = new MapPlugin({
    filename: 'map.json',//输出的文件名 即保存的文件
    path: path.resolve(__dirname, config.mapPath || distPath+"map"), //输出的目录
});

module.exports = {
    output: {
        publicPath: staticUrl,//用于配置文件发布路径，如CDN或本地服务器
        filename: 'js/[name].[chunkhash:6].js',  //根据入口文件输出多个对应的文件
        chunkFilename: 'js/[name].[chunkhash:6].js'
    },
    module: {
        loaders: [
            // {
            //     test: /\.html$/,
            //     loader: 'md5Util?static=dist'
            // },
            {
                test: /\.less$/,
                loader: extractLESS.extract(
                    'css?-autoprefixer&sourceMap!'+  /* 这里要加入　-autoprefixer　这个表示不要移除浏览器前缀（-webkit-）的样式，默认在压缩的时候会去掉前缀相关的样式　　详情查看 https://github.com/webpack/css-loader */
                    'autoprefixer?browsers=last 5 versions!'+
                    'less?sourceMap'
                )
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file?limit=8192&name=img/[folder]/" + nameStr + ".[ext]" + '!image-webpack?{progress:true, optimizationLevel: 1, interlaced: false, pngquant: {quality: "100", speed: 8}, mozjpeg: {quality: 80}}'
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'file?name=fonts/' + nameStr + '.[ext]'
            },
            {
                test: /\.jsx?$/,
                loader: "babel",
                query: {
                  presets: ['react','es2015']
                }
            }
        ],
        postLoaders: [
             {
               test: /\.js$/,
               loaders: ['es3ify-loader']
             }
        ]
    },
    plugins: [
        extractLESS,
        mapPluginInstance,
        //Webpack 提供了设置环境变量来优化代码的方案
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        // 压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false   // 忽略压缩时产生的警告
            }
        })
        //输出map文件 不太理想
        // new AssetePlugin({
        //     filename: '/dist/map.json',
        //     processOutput: function (assets) {
        //         return JSON.stringify(assets);
        //     }
        // })
    ],
    resolve: {
      //配置别名，在项目中可缩减引用路径
      alias: {},
      extensions:["",".js",".jsx"],
      root:[
          /*
              配置查找模块路径
              比如 require('react')  这个时候没有设置相对路径，就会跑到设置的路径里面去查询
          */
          path.resolve('./src/js/vendor')
      ]
    },
    externals:{
        'react':'React',
        'react-dom':'ReactDOM'
    }
};
