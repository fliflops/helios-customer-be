const { Sequelize, DataTypes, Model } = require("sequelize");

class consignee_tbl extends Model {
    static init(sequelize){
        return super.init({
            wms_consignee_id:{
                primaryKey:true,
                type:DataTypes.STRING
            },
            wms_consignee_desc:{
                type:DataTypes.STRING
            },
            wms_consignee_status:{
                type:DataTypes.STRING
            }
        },
        {
            timestamps:false,
            freezeTableName:true,
            tableName:'wms_consignee_hdr',
            sequelize
        })
    }

    static async getAllConsignee(where){
        return await this.findAll({
            where
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }
}

module.exports = consignee_tbl;

