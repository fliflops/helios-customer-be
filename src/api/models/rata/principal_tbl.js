const { Sequelize, DataTypes, Model } = require("sequelize");

class principal_tbl extends Model {
    static init(sequelize) {
        return super.init({
            principal_code:{
                primaryKey: true,
                type: DataTypes.STRING
            },
            principal_name:{
                allowNull:false,
                type: DataTypes.STRING
            },
            description:{
                type: DataTypes.STRING
            },
            address:{
                type: DataTypes.STRING
            },
            is_active:{
                type: DataTypes.INTEGER
            },
            ascii_principal_code:{
                type: DataTypes.STRING
            },
            ascii_customer_code:{
                type: DataTypes.STRING
            },
        },
        {
            sequelize,
            freezeTableName:true,
            timestamps:false,
            tableName:'principal_tbl'
        })
    }

    static async getAllPrincipals(where) {
        return await this.findAll({
            where
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }

}

module.exports = principal_tbl