/**
 * 测试es6语法
 */
//import './a';
import "./_jsx/common.less";
import "../../img/user/user.png";
var React = require('react');

let abc = 'abc';
class People{
	constructor(name){
		this.name = name;
	}
	sayhi(){
		console.log(`hi ${this.name} !`);
	}
}
module.exports = People;
