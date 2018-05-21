const f_error = require("./F_error");
/**
 * 所有ctl父级。
 * 包含所有dao实例
 */

class ControllerBase {

  constructor(dao){

    this.dao = dao;
  }

  error(message, statu){

  	throw new f_error({status, message})
  }
};

module.exports = ControllerBase;