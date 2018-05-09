const Sequelize = require('sequelize');
const DB = require('./DB');

class MysqlBase {

	constructor(_db){
		this._db = _db;
	}

    createTable(tableName,fields,options={}){
    	this.name = tableName;
        tableName = DB.getTableName(tableName);
        let model = this._db.define(tableName,fields,options);
        return model;
    }

    getTableName(){

        return this.name;
    }
};
MysqlBase.type = 'mysql';
module.exports = MysqlBase;