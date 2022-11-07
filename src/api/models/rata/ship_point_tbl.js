const { Sequelize, DataTypes, Model } = require("sequelize");

class ship_point_tbl extends Model {
    static init(sequelize) {
        return super.init(
            {
                stc_code:{
                    primaryKey:true,
                    type:DataTypes.STRING
                },
                stc_description:{
                    type:DataTypes.STRING
                },
                stc_name:{
                    type:DataTypes.STRING
                },
                stc_address:{
                    type:DataTypes.STRING
                },
                long:{
                    type:DataTypes.DECIMAL
                },
                lat:{
                    type:DataTypes.DECIMAL
                },
                country:{
                    type:DataTypes.STRING
                },
                region:{
                    type:DataTypes.STRING
                },
                province:{
                    type:DataTypes.STRING
                },
                city:{
                    type:DataTypes.STRING
                },
                barangay:{
                    type:DataTypes.STRING
                },
                zip_code:{
                    type:DataTypes.INTEGER
                }
            },
            {
                sequelize,
                freezeTableName:true,
                tableName:'ship_point_tbl'
            }
        )
    }

    static async getAllShipPoints(where){
        return await this.findAll({
            where
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }
}

module.exports = ship_point_tbl;