const Provider = require('../Fishbone/Provider');
// const public_class = require('./public/Public');
const glob = require("glob");
const path = require("path");
const dir = path.resolve(__dirname);
const controller = {};
const dao = {};

//Controller
controller.test = require('./Controllers/test');

// //dao
// dao.wx = require('./dao/WxDao');

//model
const db = glob.sync(`/model/**`, {root: dir,nodir: true,nocase: true});

class Base extends Provider{
	constructor(){
		super();

		console.log('base')
		for(let k of Object.keys(controller)){
			this.registerController(k,controller[k]);
		}

		for(let v of Object.keys(db)){
			this.registerModel(require(db[v].replace(/`${dir}server`/g, '.')));
		}
	}
}
module.exports = new Base();