/**
 * [testController 测试文件]
 * @return {[type]} [description]
 */
const ControllerBase = require('../../Fishbone/ControllerBase');
const request = require('request');

class testController extends ControllerBase{

	constructor(dao){
		super(dao);
	};

	async testAction(data){

		console.log(JSON.stringify(data));
		// console.log('==============');
		// console.log(self);
		this.error('报错', '50001')
		// await this.dao['test'].test();
		return 'Hello, world';
	};

	async indexAction(data){

        this.error(400, '错误')
		try{
			console.log(data);
			return 'Hello, world';
		}catch(e){
			console.log(e)
		}
	}
};
module.exports = testController;

