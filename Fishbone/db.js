const Sequelize = require('sequelize');
const mongoose = require('mongoose');

class DB {

  static async createMysql(options) {

    try{
      this.mysql = {
        tablePrefix = options.tablePrefix
      }
      var sequelize = new Sequelize(options.dbname,options.username,options.password,options.options);
      console.log('mysql连接')
    }catch(e){
      console.log(e)
    }

    return sequelize;
  }

  static getTableName(name, db) {

    return `${this[db].tablePrefix}_${name}`;
  }


  static async createMongo(options) {

    try{
      this.mongo = {
        tablePrefix = options.tablePrefix
      }
      var db = mongoose.createConnection(options.url); 
      db.on('open',(msg)=>{
        console.log(`open db:${options.url}`)
        // log4js.server.info(`open db:${options.url}`);
      });
      db.on('reconnected',(msg)=>{
        console.log("reconnected")
        // log4js.server.info("reconnected");
      });
      db.on('disconnected',(msg)=>{
        console.log("disconnected")
        // log4js.server.info("disconnected");
      });
      db.on('close',(msg)=>{
        console.log("close")
        // log4js.server.info("close");
      });
      db.on('connected',(msg)=>{

        console.log(`connected to:${options.url}`)
        // log4js.server.info(`connected to:${options.url}`);
      });
      db.on('error',(msg)=>{
        console.err(msg);
      });
      // this.dbPromise = new Promise((r,j)=>{
      // });
    }catch(e){
      console.log(e)
    }

    return db;
  }
};

module.exports = DB;