const Joi = require('joi');

module.exports ={
    //POST /v1/user/clients
    register: {
        body: {
            first_name: Joi.string().required(),
            last_name:  Joi.string().required(),
            email:      Joi.string().required().email(),
            password:   Joi.string().required().min(6),
            store_name: Joi.string().required(),
            brand_name: Joi.string().required(),
            legal_name: Joi.string().required(),
        }
    },
    //GET /v1/user/clients
    getUser: {
        query:{
            pageSize:    Joi.number().required(),
            pageIndex:   Joi.number().required(),
            order:       Joi.string(),
            first_name:  Joi.string(),
            last_name:   Joi.string(),
            user_status: Joi.string(),
            user_type:   Joi.string(),
            store_name:  Joi.string(),
            brand_name:  Joi.string(),
            legal_name:  Joi.string(),
            email:       Joi.string(),
        }
    },
    //PUT /v1/user/clients/:id
    approveUser:{
        params:{
            id: Joi.string().required()
        },
        body:{
            stc_code: Joi.string().optional(),
            stc_name: Joi.string().optional(),
            consignee_code: Joi.string().optional(),
            consignee_name: Joi.string().optional(),
            principals: Joi.array().items(Joi.object({
                principal_code:Joi.string().required(),
                principal_name:Joi.string().required(),
                user_id:Joi.string().required()
            })).optional(),
            user_status: Joi.string().optional()
        }
    },
    //POST /v1/user/confirm-email
    emailConfirmation: {
        body: {
            token: Joi.string().required()
        }
    }
}