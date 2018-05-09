const Sequelize = require('sequelize');

class DB {

  static async createMysql(options) {

    try{
      this.tablePrefix = options.tablePrefix;
      var sequelize = new Sequelize(options.dbname,options.username,options.password,options.options);
      console.log('mysql连接')
    }catch(e){
      console.log(e)
    }

    return sequelize;
  }

  static getTableName(name) {

    return `${this.tablePrefix}_${name}`;
  }
};

module.exports = DB;