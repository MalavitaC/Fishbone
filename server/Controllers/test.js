/**
 * [testController 测试文件]
 * @return {[type]} [description]
 */
const ControllerBase = require('../../Fishbone/ControllerBase');
const request = require('request');

var self;
class testController extends ControllerBase{

	constructor(dao){
		super(dao);
		self = this;
	}

	async testAction(data){

		try{
			console.log(data);
			console.log(this)
			// console.log('==============');
			// console.log(self);
			// await self.dao['test'].test();
			return 'Hello, world';
		}catch(e){
			console.log(e)
		}
	}

	async indexAction(data){

		try{
			console.log(data);

			// console.log('==============');
			// console.log(self);
			// await self.dao['test'].test();
			return 'Hello, world';
		}catch(e){
			console.log(e)
		}
	}
};

module.exports = testController;

