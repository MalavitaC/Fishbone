const Provider = require('../Fishbone/Provider');
// const public_class = require('./public/Public');
// const glob = require("glob");
const path = require("path");
const fs = require('fs');
const dir = path.resolve(__dirname);
const controller = {};
const dao = {};

//Controller
controller.test = require('./Controllers/test');
// //读取Controllers下所有js文件，并注册到路由中
// let files = fs.readdirSync('./Controllers')
// let controllerFiles = files.filter(f => {
//   return f.endsWith('.js')
// });
// let routes = await regCons.addControllers(controllerFiles)

// //dao
// dao.wx = require('./dao/WxDao');

// //model
// const db = glob.sync(`/model/**`, {root: dir,nodir: true,nocase: true});

class Base extends Provider{
	constructor(){
		super();
		console.log('base')
	}

	async init(){
		for(let k of Object.keys(controller)){
			this.registerController(k,controller[k]);
		}
	}
}
module.exports = new Base();