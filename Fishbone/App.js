const Koa = require('koa');
const bodyParser = require('koa-better-body');
const DB = require('./DB');
const kcors = require('kcors')();
const middleware = require('./Middleware');
const router = require('koa-router')();
const jwt = require('koa-jwt');
const app = new Koa();
const port = 3001;
/**
 * 控制器启动文件
 */
class App{
	
	constructor({config, base}){
		// super();
		this.config = config;
		this.base = base;
		this.db = {};
	}

	async strat(data){

		app.use(bodyParser());
        app.use(kcors);
		//捕捉报错中间件
		app.use(middleware.error);
		//jwt验证中间件
		app.use(jwt({secret: this.config.secret}).unless({path: this.config.noAuth}));
		//注册路由中间件
		app.use(this.route.routes());

		console.log(`项目启动,端口号：${this.config.port || port}`)
		app.listen(this.config.port || port)
	}

	async createDb(){
		
		if(this.config.db.hasOwnProperty('mysql')){
			//创建数据库连接
			this.db.mysql = await DB.createMysql(this.config.db.mysql);
			//传入mysql对象
			// modelBase.setData(this.db.mysql);
			// this.base = new Base(this.db.mysql)
			await this.base.initMysqlModels(this.db);
		}
		if (this.config.db.hasOwnProperty('mongo')) {
			//创建数据库连接
			this.db.mongo = await DB.createMongo(this.config.db.mongo);
			await this.base.initMongoModels(this.db);
		}
		await this.base.createDao();
		//注册ctl
		this.route = await this.base.createRoute({router});
		return;
	}
}
module.exports = App;