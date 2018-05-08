const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const DB = require('./DB');
const router = require('koa-router')();
const app = new Koa();
// const provider = new Provider();
const port = 3001;
// app.use(bodyParser());
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

		DB.getTableName();
		console.log(`注册路由`)
		this.route = await this.base.createRoute({router});
		app.use(this.route.routes());

		console.log(`项目启动,端口号：${this.config.port || port}`)
		app.listen(this.config.port || port)
	}

	async createDb(){
		this.db.mysql = await DB.createMysql(this.config.db.mysql);
		return;
	}
}
module.exports = App;