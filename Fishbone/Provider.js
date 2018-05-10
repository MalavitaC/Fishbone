const reg=new RegExp(/Action$/);
class Provider{

	constructor(name,dbManager) {

		// this._name = name;
		this._model = [];
		// this._dao = new Map();
		// this._controller = new Map();
		// this._dbManager = dbManager;
		this._models = {
			mysql:{}
		};
		this._mysqlModel = [];
	}


	registerModel(model){
		this._model.push(model);
	}

	registerDao(dao){
		this._dao = dao;
	}

	registerController(controller){

		this._controller = controller;
		return;
	}

	async createRoute({router}){
		for(let k of Object.keys(this._controller)){
			let ctl = new this._controller[k](this._dao);
			let methods = Object.getOwnPropertyNames(this._controller[k].prototype);
			for (var i = methods.length - 1; i >= 0; i--) {
				if (reg.test(methods[i])) {
  					router.all(`/${k}/${methods[i].replace(reg, '')}`, ctl[methods[i]]);
					// this._controller.set(`/${name}/${methods[i].replace(reg, '')}`, ctl[methods[i]])
				}
			}
		}
		return router;
	}

	//实例化dao，并注入models
	async createDao(dao){
		for(let k of Object.keys(this._dao)){
			this._dao[k] = new this._dao[k](this._models);
		}
	}

	/*
	*	初始化model
	*/
	async initModels(_db){
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

		//将model注入daoBase
		// new DaoBase(this._models);

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