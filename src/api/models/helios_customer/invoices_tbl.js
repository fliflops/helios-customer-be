const { Sequelize, DataTypes, Model } = require("sequelize");

class invoices_tbl extends Model {
    static init(sequelize){
        return super.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4  
            },
            invoice_no:{
                type: DataTypes.STRING
            },
            rdd:{
                type: DataTypes.DATEONLY
            },
            stc_code:{
                type: DataTypes.STRING
            },
            principal_code:{
                type: DataTypes.STRING
            },
            location_code:{
                type: DataTypes.STRING
            },
            invoice_status:{
                type: DataTypes.STRING
            },
            createdAt:{
                type: Sequelize.DATE
            },
            createdBy:{
                type: DataTypes.STRING
            },
            updatedAt:{
                type: Sequelize.DATE
            },
            updatedBy:{
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            freezeTableName:true,
            timestamps:true,
            tableName:'invoices_tbl'
        })
    }

    static async getPaginatedInvoices ({
        filters,
        order,
        page,
        totalPage
    }) {
        return await this.findAndCountAll({
            where:{
                ...filters
            },
            offset: parseInt(page) * parseInt(totalPage),
            limit: totalPage,
            order
        })   
    }

    static async getAllInvoices (where) {
        return await this.findAll({
            where:{
                ...where
            }
        })
    }

    static async bulkCreateInvoices(data) {
        return await this.bulkCreate(data)
    }
}

module.exports = invoices_tbl