/**
 * [Gulpfile for webpack-gulp-build]
 * created by LJL
 */
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const fileinclude = require('gulp-file-include');


//配置相关文件
const config = require('./config.json');
const srcDir = config.path.src;
const debugDir = config.path.debug;
const distDir = config.path.dist;
const appJsPath = config.appJsPath;
const htmlViews = config.htmlViews;

// 针对源码，如果以_开头的文件夹或与以_开关的文件都不编译
const _htmlSrcPath = srcDir+'/html/';
const _htmlFile = [
    _htmlSrcPath+'*.html',
    _htmlSrcPath+'**/*.html',
    `!${_htmlSrcPath}/**/_*/*.html`,
    `!${_htmlSrcPath}/**/_*/**/*.html`,
    `!${_htmlSrcPath}/**/_*.html`
];//html

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

/* dev 开发环境下编译 */
gulp.task('dev',['html:build','html:watch'])
