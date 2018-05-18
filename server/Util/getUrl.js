
const request = require("request");

class getUrl {
	constructor(){
		super();

		for(let v of Object.keys(db)){
			this.registerModel(require(db[v].replace(/`${dir}server`/g, '.')));
		}

		this.registerDao(dao);
		this.registerController(controller);
	}

	async getJson(){

	}
}
module.exports = new getUrl();