const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const Provider = require('./Provider');
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
	}

	async strat(data){

		console.log(`注入控制器`)
		this.route = await this.base.createRoute({router});
		// console.log(`注册控制器`)
		app.use(this.route.routes());

		console.log(`项目启动,端口号：${this.config.port || port}`)
		app.listen(this.config.port || port)
	}

	// async createRoute(){

	// 	return;
	// }
}
module.exports = App;