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

    if(file){
        //处理文件名
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
    //opt.devtool = 'source-map';  // 生成sourcemap,便于调式
    opt.watch = true;
    opt.output.publicPath = staticUrl;

    // webpack 模块配置
    opt.module = {
        //各种加载器，即让各种文件格式可用require引用
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
                test: /\.(jpg|png|gif)$/,
                loader: "url?limit=8192&name=img/[folder]/[name].[ext]" + "!img?minimize&progressive=true&optimizationLevel=5"
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
        ],
        postLoaders: [
            //webpack 引用es3ify-loader 解决es3语法兼容问题
            {
                test: /\.jsx?$/,
                loaders: ['es3ify-loader']
            }
        ]
    };

    // 插件
    opt.plugins = [
        extractLESS
    ];

    //当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，这在实际开发中很有必要。此时我们就可以通过配置externals参数来解决这个问题：
    opt.externals  = {
        'react': 'React',
        'react-dom':'ReactDOM'
    };

    opt.resolve = {
        extensions:["",".js","jsx"], //配置默认后缀,比如 require('./a')  会解析成 require('./a.js'), 第一个参数一定是空字符串，表示用默认的后缀，只有没有后缀才会自动添加
        root: [
            /*
                配置查找模块路径
                比如 require('react')  这个时候没有设置相对路径，就会跑到设置的路径里面去查询
                这里主要是针对核心文件的处理
                当然如果是这样的文件不多  也可以通过设置alias来实现
            */
            path.resolve('./src/js/vendor')
        ],
        //别名
        /*
        alias: {
            'react': 'react.js'
        }
        */

    }


    return opt;
}
