# webpack-gulp-build

## 项目介绍
本脚手架是利用webpack+react+gulp架构的前端项目

### 特点：
- 适合多页应用
- 既可实现前后端分离，也可以生成后端渲染所需要的模板
- 可以解析JSX语法
- 可以解析ES6语法新特性
- 支持LESS预处理器
- 区分开发环境及生产环境
- 单独分离CSS样式文件
- 支持编译HTML模板
- 支持文件MD5戳，解决文件缓存问题
- 支持图片、iconfont(图标字体)等资源的编译

## 使用说明

### 安装
```shell
$ git clone https://github.com/lijiliang/webpack-gulp-build.git
$ cd webpack-gulp-build
$ npm install
$ npm i gulp -g
```
### 开发模式
```shell
npm run dev
```

### 构建模式
```shell
npm run build
```
## CLI命令(npm scripts)
| 命令            | 作用&效果      |
| --------------- | ------------- |
| npm run build   | 根据`webpack.config.js`，build出一份生产环境的代码 |
| npm run dev     | 根据`webpack.dev.config.js`，build出一份开发环境的代码 |
| npm run core:dev   | 根据`webpack.core.js`,build出一份开发环境的公共资源代码 |
| npm run core:build   | 根据`webpack.core.js`,build出一份生产环境的公共资源代码 |

## config.json
```js
{
    "path":{//目录
        "src": "src",//源码目录
        "debug": "debug",//调试代码目录
        "dist": "dist" //生产代码目录
    },
    "appJsPath":"app", //业务js目录  相对于源码目录
    "htmlViews": "../html", //模板输出目录
    "mapPath": "../html/map" //map 文件输出
}
```

## 目录结构说明
```
├─src //项目源码
│  ├─js       //js目录
│      ├─app        //业务代码目录
│      │  ├─_common //通用代码目录
│      │  └─_jsx    //React组件目录
├─debug  //开发环境下build的文件
│  ├─css
│  ├─js
│  ├─html  
│  ├─fonts
├─dist  //生产环境下build的文件
│  ├─css
│  ├─js
│  ├─html  
│  ├─fonts
├─node_modules //利用npm管理的所有包及其依赖
├─package.json //npm的配置文件
├─.gitignore   //gitignore忽略文件
├─config.json  //配置文件，需要自己配置
├─gulpfile.js  //gulp配置文件
├─README.md    // 项目说明文件
├─webpack.config.js //构建模式配置
├─webpack.core.js   //核心文件构建
└─webpack.dev.js    //开发模式配置
```
## 技术栈
- [x] [Webpack](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [ES6](http://es6.ruanyifeng.com/)
- [x] [Babel](https://babeljs.io/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [x] [CSS modules](https://github.com/outpunk/postcss-modules)
