const f_error = require("./F_error");
/**
 * 所有ctl父级。
 * 包含所有dao实例
 */

class ControllerBase {

  constructor(dao){

    this.dao = dao;
  }

  error(message, status){

  	throw new f_error({status, message})
  }

  checkKeyExists(map, ...keys) {

		for(let key of keys){
			if (!(key in map))
				this.error(`${key} is undefined`, 50002);
		}
    return map;
	}

};

module.exports = ControllerBase;