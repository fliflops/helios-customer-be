const { Sequelize, DataTypes, Model } = require("sequelize");

class user_tbl extends Model {
    static init(sequelize) {
        return super.init(
            {
                id:{
                    allowNull: false,
                    primaryKey: true,
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4            
                },
                first_name: {
                    type: DataTypes.STRING
                },
                last_name: {
                    type: DataTypes.STRING
                },
                user_status:{
                    type: DataTypes.STRING
                },
                user_type:{
                    type: DataTypes.STRING
                },
                email:{
                    type: DataTypes.STRING
                },
                user_password:{
                    type: DataTypes.STRING
                },
                stc_code:{
                    type: DataTypes.STRING
                },
                stc_name:{
                    type: DataTypes.STRING
                },
                consignee_code:{    
                    type: DataTypes.STRING
                },
                consignee_name:{
                    type: DataTypes.STRING
                },
                qr_key:{
                    type: DataTypes.STRING
                },
                qr_key_expiry:{
                    type:DataTypes.DATE
                },
                is_approved:{
                    type: DataTypes.TINYINT
                },
                is_verified:{
                    type: DataTypes.TINYINT
                },
                is_first_logged:{
                    type: DataTypes.TINYINT
                },
                store_name:{
                    type: DataTypes.STRING
                },
                brand_name:{
                    type: DataTypes.STRING
                },
                legal_name: {
                    type: DataTypes.STRING
                },
                createdAt:Sequelize.DATE,
                updatedAt:Sequelize.DATE,
                updatedBy:DataTypes.STRING
            },
            {
                sequelize,
                freezeTableName:true,
                tableName:'user_tbl'
            }
        )
    }

    static async getAllUsers(where) {
        return await this.findAll({
            where
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }

    static async updateUser({where,options,data}) {
        return await this.update({
            ...data
        },{
            where,
            ...options
        })
    }

    static async getUser(where) {
        return await this.findOne({
            where
        })
        
    }

    static async getPaginatedUser({
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

    //Associations
    static associate(models) {
        this.principals = this.hasMany(models.user_principal_tbl)
    }

}

module.exports = user_tbl