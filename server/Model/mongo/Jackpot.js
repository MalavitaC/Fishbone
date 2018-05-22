const MongoBase = require('../../../Fishbone/MongoBase');
class JackpotModel extends MongoBase {
    constructor(_db){
        super(_db)
    }
    init() {
        let model = this.createTable('jackpot', {
            quantity: {type: Number},
            ronda: {type: Number},
            expireAt: {type: Date},
            updateTime:{type: Date}
        });
        model.index({expireAt: 1}, { expireAfterSeconds: 0 });
        return model;
    }
}
module.exports = JackpotModel;