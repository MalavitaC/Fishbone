/**
 * [testDao 测试文件]
 * @return {[type]} [description]
 */
const DaoBase = require('../../Fishbone/DaoBase');
class testDao extends DaoBase{

	constructor(db){
		super(db);
	}

	async test(params){
		console.log('in testDao')
	}
};

module.exports = testDao;

