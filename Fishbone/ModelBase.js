const Sequelize = require('sequelize');
const DB = require('./DB');

class ModelBase {

    createTable(tableName,fields,options={}){
        tableName = DB.getTableName(tableName);
        // let model = this._db.define(tableName,fields,options);
        // return model;
    }
};
module.exports = ModelBase;