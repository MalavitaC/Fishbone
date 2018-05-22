const mongoose = require('mongoose');
const DB = require('./DB');

class MongoBase {

	constructor(_db){
		this._db = _db;
	}
    
    createTable(tableName,fields){
        this.name = tableName;
        this.tableName = DB.getTableName(tableName, 'mongo');
        let model = mongoose.Schema(fields, {collection: this.tableName,bufferCommands: false});
        model.set('collection', this.tableName);
        return model;
    }

    getModelName(){

        return this.name;
    }

    getTableName(){

        return this.tableName;
    }
};
MongoBase.type = 'mongo';
module.exports = MongoBase;