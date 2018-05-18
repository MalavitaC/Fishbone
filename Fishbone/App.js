const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const DB = require('./DB');
const router = require('koa-router')();
const app = new Koa();
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

		//捕捉报错中间件
		app.use(async(ctx, next)=>{
			
			try {
				ctx.error = (code, message) => {
					if (typeof code === 'string') {
						message = code;
						code = 500;
					}
					ctx.throw(code || 500, message || '服务器错误');
				};
				await next();
			} catch (e) {
				let status = e.status || 500;
				let message = e.message || '服务器错误';
				ctx.body = {
					status,
					message
				};
			}
		});
		this.route = await this.base.createRoute({router});
		app.use(this.route.routes());

		console.log(`项目启动,端口号：${this.config.port || port}`)
		app.listen(this.config.port || port)
	}

	async createDb(){
		//创建数据库连接
		
		if(this.config.db.hasOwnProperty('mysql')){
			this.db.mysql = await DB.createMysql(this.config.db.mysql);
			//传入mysql对象
			// modelBase.setData(this.db.mysql);
			// this.base = new Base(this.db.mysql)
			await this.base.initModels(this.db.mysql);
			await this.base.createDao();
		}
		return;
	}
}
module.exports = App;