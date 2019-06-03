import Koa from 'koa';
// import * as DB from './DB';
import {error} from './Middleware';
import * as jwt from 'koa-jwt';
import {IStart, IConfig, IBase} from './Component/App'
import {loadRouter} from './Loaded'
const app = new Koa();
const port = 3001;

export default class implements IStart {
    
	private config: IConfig
	private base?: IBase | object
    
	constructor(config: IConfig = {}, base: IBase | object = {}){
		this.config = config;
		this.base = base;
		// this.db = {};
	}

	strat(){
        
		//捕捉报错中间件
		app.use(error);
		//jwt验证中间件
		// app.use(jwt({secret: this.config.secret}).unless({path: this.config.noAuth}));
        //注册路由中间件
        app.use(loadRouter());

		console.log(`项目启动,端口号：${this.config.port || port}`)
		app.listen(this.config.port || port)
    }
}