
const MysqlBase = require('../../../Fishbone/MysqlBase');
const Sequelize = require('sequelize');
class Dome extends MysqlBase{

	constructor(_db){
		super(_db)
	}

	init(){
        let model = this.createTable("dome",{
			id:{
				type: Sequelize.INTEGER(11).UNSIGNED,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			user_id:{
				type: Sequelize.INTEGER(11).UNSIGNED,
				allowNull: false
			},
			msg: {
				type:Sequelize.BLOB(),
				allowNull: false
			},
			state:{
				type:Sequelize.BOOLEAN(1),
				defaultValue: 0
			},
		},
		{
			timestamps: true,
			createdAt:'create_time',
			updatedAt:'update_time',
			freezeTableName: true,
		});
		return model;
	}
    createRelationShip(models){

        // models.barrage_t.belongsTo(models.user, {foreignKey: 'user_id', as: 'user'});
        // models.barrage_t.hasOne(models.barrage, {foreignKey: 'barrage_t_id', as: 'barrage'});
        return;
    }
}
module.exports = Dome;