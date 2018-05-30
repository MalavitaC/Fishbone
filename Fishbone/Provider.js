const reg=new RegExp(/Action$/);
class Provider{

	constructor(name,dbManager) {

		// this._name = name;
		this._model = [];
		// this._dao = new Map();
		// this._controller = new Map();
		// this._dbManager = dbManager;
		this._models = {
			mysql:{},
			mongo:{}
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
		//遍历所有controller
		for(let k of Object.keys(this._controller)){
			//实例化controller，传入Dao实例对象
			let ctl = new this._controller[k](this._dao);
			//获取controller里的所有方法
			let methods = Object.getOwnPropertyNames(this._controller[k].prototype);
			//遍历controller里的方法
			for (var i = methods.length - 1; i >= 0; i--) {
				//判断是否为接口方法
				if (reg.test(methods[i])) {

					let index = i;
					//k:模块名 methods[i]:接口名
  					router.all(`/${k}/${methods[i].replace(reg, '')}`, async (ctx, next)=>{

  						let data = {
  							params: {},
  						};
  						//合并请求参数
						Object.assign(data.params, ctx.request.query, ctx.request.body);
  						let body = await ctl[methods[index]](data);
  						ctx.body = {
  							code: 0,
  							data: body,
  						}
  					});
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
	async initMysqlModels(_db){
		//循环注册过的model
		this._model.forEach((model, key, map)=>{

			if(model.type === 'mysql'){
				let _model = new model(_db[model.type]);
				// 初始化modle
				let obj = _model.init();
				this._mysqlModel.push(_model);
				this._models[model.type][_model.getTableName()] = obj;
			}
		});
		this._models['mysql'].model = _db['mysql'];

		//如果有mysql的model需要调用model的建立表之间关系的方法
		this._mysqlModel.forEach((model, key, map)=>{
			model.createRelationShip(this._models['mysql']);
		});
		//调用sync去同步表
		_db['mysql'].sync({force: false});
	}

	/*
	*	初始化Mongo的model
	*/
	async initMongoModels(_db){
		//循环注册过的model
		this._model.forEach((model, key, map)=>{
			
			if (model.type === 'mongo') {

				let _model = new model(_db[model.type]);
				// 初始化modle
				let obj = _model.init();
				//mongo同步数据库
				this._models[model.type][_model.getModelName()] = _db[model.type].model(_model.getTableName(),obj);
			}
		});
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