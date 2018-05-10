/**
 * 所有Dao父级
 * 包含所有model模型
 */
class DaoBase {

	constructor(db){
		this.db = db;
	}

};
module.exports = DaoBase;