let flag = false;
const reg=new RegExp(/Action$/);
class Provider{

	constructor(name,dbManager) {

			console.log(flag)
		if (flag == false) {
			console.log('init Provider')
			flag = true;
			// this._name = name;
			this._model = [];
			this._dao = new Map();
			this._controller = new Map();
			// this._dbManager = dbManager;
			this._models = {};
			this._mysqlModel = [];
		}
	}


	registerModel(model){
		this._model.push(model);
	}

	registerDao(name,dao){
		let d = new dao();
		this._dao.set(name,d);
	}

	registerController(name,controller){

		console.log('registerController') 
		let ctl = new controller(name);
		let methods = Object.getOwnPropertyNames(controller.prototype);
		// this._controller.set(name,{});
		for (var i = methods.length - 1; i >= 0; i--) {
			console.log(methods[i]) 
			if (reg.test(methods[i])) {
				console.log(methods[i].replace(/[\Action$]/g,""))
				this._controller.set(`/${name}/${methods[i]}`, ctl[methods[i]])
			}
		}
		return;
	}

	async createRoute({router}){

		console.log('createRoute')
		console.log(this._controller)
		for(let [k, v] of this._controller){
			console.log(`${k}, ${v}`)
  			router.all(k, v);
		}
		return router;
	}
	// constructor(dbManager){
	// 	super("demo",dbManager);

	// 	for(let k of Object.keys(controller)){
	// 		this.registerController(k,controller[k]);
	// 	}
	// 	for(let k of Object.keys(dao)){
	// 		this.registerDao(k,dao[k]);
	// 	}
	// 	for(let v of Object.keys(db)){
	// 		this.registerModel(require(db[v].replace(/`${dir}admin`/g, '.')));
	// 	}
	// }
}
module.exports = Provider;