const { Sequelize, DataTypes, Model } = require("sequelize");

class user_principal_tbl extends Model {
    static init(sequelize) {
        return super.init({
            id:{
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4 
            },
            user_id:{
                type: DataTypes.STRING
            },
            principal_code:{
                type: DataTypes.STRING
            },
            principal_name:{
                type: DataTypes.STRING
            },
            createdAt:Sequelize.DATE,
            updatedAt:Sequelize.DATE,
            updatedBy:DataTypes.STRING,
            createdBy:DataTypes.STRING
        },
        {
            sequelize,
            freezeTableName:true,
            tableName:'user_principal_tbl'
        })

        
    }

    static async bulkCreateUserPrincipal ({data,options}) {
        return await this.bulkCreate(data,{
            ...options
        })
    }

    static async getAllUserPrincipal (where) {
        return await this.findAll({
            where
        })
        //.then(result => JSON.parse(result))
        
    }
}

module.exports = user_principal_tbl;