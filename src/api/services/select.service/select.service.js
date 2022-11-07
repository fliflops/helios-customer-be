const {rataModels,tmsModels, models} = require('../../models');
const APIError = require('../../errors/api-error');

exports.getAllPrincipals = async() => {
    try{
        const data = await rataModels.principal_tbl.getAllPrincipals()

        return data.map(item => {
            return {
                label:item.principal_name,
                value:item.principal_code
            }
        })
    }
    catch(e){
        throw e
    }
}

exports.getAllShipPoints =  async() => {
    try{
        const data = await rataModels.ship_point_tbl.getAllShipPoints()
        return data.map(item => {
            return {
                label:item.stc_name,
                value:item.stc_code
            }
        })
    }
    catch(e){
        throw e
    }
}

exports.getAllConsignee = async() => {
    try{
        const data = await tmsModels.consignee_tbl.getAllConsignee()
        return data.map(item => {
            return {
                label:item.wms_consignee_id,
                value:item.wms_consignee_desc
            }
        })
    }
    catch(e){
        throw e
    }
}

exports.getAllUserPrincipal = async(user) => {
    try{

        const data = await models.user_principal_tbl.getAllUserPrincipal({
            user_id:user  
        })
        return data.map(item => {
            return {
                label:item.principal_name,
                value:item.principal_code
            }
        })
    }
    catch(e){
        throw e
    }
}