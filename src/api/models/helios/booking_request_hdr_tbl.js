const { Sequelize, DataTypes, Model } = require("sequelize");

class booking_request_hdr_tbl extends Model {
    static init(sequelize) {
        return super.init({
            bookingRequestNo: { 
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING
            },
            serviceType: {
                allowNull: true,
                type: DataTypes.STRING
            },
            drNo: {
                allowNull: true,
                type: DataTypes.STRING
            },
            shipmentManifest: {
                allowNull: true,
                type: DataTypes.STRING
            },
            customerCode: {
                allowNull: true,
                type: DataTypes.STRING
            },
            shipToCode: { //FK
                allowNull: false,
                type: DataTypes.STRING
            },
            invoiceNo: {
                allowNull: true,
                type: DataTypes.STRING
            },
            deliveryDate: {
                allowNull: true,
                type: DataTypes.DATEONLY
            },
            brStatus: {
                allowNull: true,
                type: DataTypes.STRING
            },
            locationCode: { //FK
                allowNull: false,
                type: DataTypes.STRING
            },
            deliveryStatus:{
                allowNull:true, 
                type:DataTypes.STRING
            },
            rudStatus:{
              allowNull:true,
              type:DataTypes.STRING  
            },
            pod_remarks:{
                allowNull:true,
                type:DataTypes.STRING
            }, 
            rud_remarks:{
                allowNull:true,
                type:DataTypes.STRING
            }
        },
        {
            sequelize,
            timestamps:false,
            freezeTableName:true,
            tableName:'booking_request_hdr_tbl'
        })
    }

    static async getAllBookingRequest(where) {
        return await this.findAll({
            where
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }
}

module.exports = booking_request_hdr_tbl;