const {rataModels} = require('../../models');
const models = rataModels;

const getAllUser = async ({
    filters
}) => {
    try{

        return await models.user_tbl.findAll({
            where:{
                ...filters
            }
        })
        .then(result => JSON.parse(JSON.stringify(result)))
    }
    catch(e){
        throw e
    }

}

const getByID = async(id) => {
    try{
        return await models.user_tbl.findByPk(id)
    }
    catch(e){
        throw e
    }
}

module.exports = {
    getAllUser,
    getByID
}

