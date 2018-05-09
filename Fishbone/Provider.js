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
			this._models = {
				mysql:{}
			};
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
			if (reg.test(methods[i])) {
				this._controller.set(`/${name}/${methods[i]}`, ctl[methods[i]])
			}
		}
		return;
	}

	async createRoute({router}){

		for(let [k, v] of this._controller){
  			router.all(k, v);
		}
		return router;
	}

	/*
	*	初始化model
	*/
	initModels(_db){
		console.log(`实例化model`)
		//循环注册过的model
		this._model.forEach((model, key, map)=>{
			
			if(model.type === 'mysql'){
				let _model = new model(_db);
				// 初始化modle
				let obj = _model.init();
				this._mysqlModel.push(_model);
				this._models['mysql'][_model.getTableName()] = obj;
			}
		});
		//如果有mysql的model需要调用model的建立表之间关系的方法
		this._mysqlModel.forEach((model, key, map)=>{
			model.createRelationShip(this._models['mysql']);
		});
		//调用sync去同步表
		_db.sync({force: false});
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