const Joi = require('joi');

module.exports = {
    //POST /v1/auth/login
    login : {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6)
        }
    },

    //POST /v1/auth/logout
    logout:{
        body:{
            email:Joi.string().email().required()
        }
    },
    //POST /v1/auth/register/email
    email: {
        params:{
            email: Joi.string().email().required()
        }
    },
    qr: {
        body:{
            qr_key:Joi.string().required(),
            email: Joi.string().email().required()
        }
    }
}