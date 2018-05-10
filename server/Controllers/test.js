/**
 * [testController 测试文件]
 * @return {[type]} [description]
 */
const ControllerBase = require('../../Fishbone/ControllerBase');
var self;
class testController extends ControllerBase{

	constructor(dao){
		super(dao);
		self = this;
	}

	async wxAction(ctx, next){

		try{
			let data = ctx.request.query;
			console.log(data);

			console.log('==============');
			console.log(self);
			await self.dao['test'].test();
			ctx.body = 'holle,word';
		}catch(e){
			console.log(e)
		}
	}
};

module.exports = testController;

