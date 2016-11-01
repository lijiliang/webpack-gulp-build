/**
 * [Gulpfile for webpack-gulp-build]
 * created by LJL
 */
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const fileinclude = require('gulp-file-include');
const named = require('vinyl-named');    //该插件保证webpack生成的文件名能够和原文件对上
const webpack = require('gulp-webpack');


//配置相关文件
const config = require('./config.json');
const srcDir = config.path.src;
const debugDir = config.path.debug;
const distDir = config.path.dist;
const appJsPath = config.appJsPath;
const htmlViews = config.htmlViews;


//webpack 配置文件
var configDeBug = require('./webpack.dev');


// 针对源码，如果以_开头的文件夹或与以_开关的文件都不编译
const _htmlSrcPath = srcDir+'/html/';
const _htmlFile = [
    _htmlSrcPath+'*.html',
    _htmlSrcPath+'**/*.html',
    `!${_htmlSrcPath}/**/_*/*.html`,
    `!${_htmlSrcPath}/**/_*/**/*.html`,
    `!${_htmlSrcPath}/**/_*.html`
];//html

// js或jsx的路径
const _jsSrcPath = srcDir + '/js/';
const _jsFile = [
    `${_jsSrcPath}/${appJsPath}/**/*.js?(x)`,
    `!${_jsSrcPath}**/_*/*.js(x)`,
    `!${_jsSrcPath}**/_*/**/*.js(x)`,
    `!${_jsSrcPath}**/_*.js(x)`
]

/* html编译 */
gulp.task('html:build', ()=>{
    gulp.src(_htmlFile)
        .pipe(fileinclude('@@'))
        .pipe(gulp.dest(htmlViews))
        .on('end', ()=>{
            console.log('html 文件编译完成！')
        });
});

/* html监听 */
gulp.task('html:watch',()=>{
    watch(_htmlFile,{event: ['add','change','unlink']},(file)=>{
        gulp.src(_htmlFile)
            .pipe(fileinclude('@@'))
            .pipe(gulp.dest(htmlViews));
        console.log(file.path+' complite!');
    })
    // .pipe(fileinclude('@@'))
    // .pipe(gulp.dest(htmlViews));
});

var jsWatchList = new Set();
/* js编译 */
gulp.task('js:dev', ()=>{
    gulp.src(_jsFile)
        .pipe(watch(_jsFile,{events:['add', 'change']},(file)=>{
            if(jsWatchList.has(file.path)){
                return false;
            }else{
                jsWatchList.add(file.path)
                gulp.src(file.path)
                    .pipe(named())
                    .pipe(webpack(configDeBug(file.relative)))
                    .pipe(gulp.dest(debugDir + '/'))
                    .on('end', ()=>{
                        console.log(file.relative + 'complite!')
                    });
            }
        }));

        // .pipe(named())
        // .pipe(webpack(configDeBug()))
        // .pipe(gulp.dest(debugDir+'/'))
        // .on('end', ()=>{
        //     console.log('js complite!');
        // });
});


/* dev 开发环境下编译 */
gulp.task('dev',['html:build', 'html:watch', 'js:dev'])
