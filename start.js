const base = require('./server/Base');
const config = require('./config');
const App = require('./Fishbone/App');
const app = new App({config, base});

class start{

	static async run(){
		console.log('run')

		//注册ctl、dao、model
		await base.init();

		// 启动监听
		await app.strat();
	}
};

start.run();