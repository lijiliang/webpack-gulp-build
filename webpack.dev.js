/**
 * [webpack dev开发模式]
 * created by LJL
 */
'use strict';

const path = require('path');
const config = require('./config.json');

const staticUrl = '/debug/';
const srcPath = config.path.src;



module.exports = ()=>{
    var opt = {};

    opt.watch = true;

    return opt;
}
