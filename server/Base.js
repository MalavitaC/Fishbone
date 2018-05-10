const Provider = require('../Fishbone/Provider');
// const public_class = require('./public/Public');
const glob = require("glob");
const path = require("path");
const dir = path.resolve(__dirname);
const controller = {};
const dao = {};

//Controller
controller.test = require('./Controllers/test');

//dao
dao.test = require('./Dao/testDao');

//model
const db = glob.sync(`/model/**`, {root: dir,nodir: true,nocase: true});

class Base extends Provider{
	constructor(){
		super();

		for(let v of Object.keys(db)){
			this.registerModel(require(db[v].replace(/`${dir}server`/g, '.')));
		}

		this.registerDao(dao);
		this.registerController(controller);
	}
}
module.exports = new Base();