/**
 * 所有ctl父级。
 * 包含所有dao实例
 */

class ControllerBase {

  constructor(dao){
    this.dao = dao;
  }
};

module.exports = ControllerBase;