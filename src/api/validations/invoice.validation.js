const Joi = require('joi');

module.exports = {
    getHeliosInvoice: {
        query:{
            rdd:Joi.date().required(),
            principal:Joi.string().optional(),
        }
    },

    receiveInvoice: {
        body:{
            invoices:Joi.array().items(
                Joi.object({
                    invoice_no: Joi.string().required(),
                    rdd: Joi.string().required(),
                    stc_code: Joi.string().required(),
                    principal_code: Joi.string().required(),
                    location_code: Joi.string().required(),
                })
            ).required()
        }
    },
    getInvoice : {
        query:{
            pageSize:    Joi.number().required(),
            pageIndex:   Joi.number().required(),
        }
    }
}