const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')

const APIError = require('../../errors/api-error');
const {jwtSecret,jwtExpirationInterval,jwtRefreshSecret, jwtRefreshExpiration,jwtQrSecret} = require('../../../config/vars')
const {models} = require('../../models');
const redis = require('../../../config/redis');


const comparePassword = async ({
    hashPassword,
    password
}) => {
    try{
        return bcrypt.compare(password,hashPassword)
    }  
    catch(e){
        throw e
    }
}

exports.authenticate = async({
    email,
    password
}) => {
    try{
        const err = {
            status: httpStatus.UNAUTHORIZED,
            isPublic: true
        };

        const data = await models.user_tbl.getUser({
            email,
        })

        if(!data) {
            err.message = 'Incorrect email or password'
            throw new APIError(err)
        }

        if(data.user_status === 'INACTIVE'){
            err.message = 'Inactive User'
            throw new APIError(err)
        }

        const isPasswordMatch = await comparePassword({
            hashPassword: data.user_password,
            password
        })

        if(!isPasswordMatch){
            err.message = 'Incorrect email or password'
            throw new APIError(err)
        }
        
        const token = jwt.sign({
            user_info: data
        },jwtSecret,
        {
            expiresIn:jwtExpirationInterval
        })
        
        const refreshToken = jwt.sign(
            {
                email: data.email
            },
            jwtRefreshSecret,
            {
                expiresIn:'1d'
            }
        )

        return {
            token:token,
            refreshToken,
            email:email
        }
    }
    catch(e){
        throw e
    }
}

exports.authenticateQrKey = async({
    qr_key,
    email
})=>{
    try{
        return jwt.verify(qr_key,jwtQrSecret,async (error,result)=>{
            const getUser = await models.user_tbl.getUser({
                qr_key:result.qr_key,
                email
            })

            if(!getUser) {
                throw new APIError({
                    message:'Invalid QR Code',
                    status:httpStatus.UNAUTHORIZED,
                    isPublic:true
                })
            }
            return getUser
        })        
    }
    catch(e){
        throw e
    }
}

exports.getUserRedisSession = async({email}) => {
    return (await redis.json.get(`helios_customer_db:session:${email}`))?.refreshToken || []
}


exports.setUserRedisSession = async({email,data}) => {
    return await redis.json.set(`helios_customer_db:session:${email}`,'.',data)
}

exports.validateRefreshToken = async({
    user,
    newRefreshToken,
    cookies
}) => {
    try{
        
        let userRefreshToken = (await redis.json.get(`helios_customer_db:session:${user}`))?.refreshToken || []
        
        // console.log(userRefreshToken)
        let newRefreshTokenArray = !cookies?.jwt
        ?   userRefreshToken
        :   userRefreshToken.filter(rt => rt !== cookies.jwt)

        if(cookies?.jwt){
            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = userRefreshToken.find(t => t === refreshToken);

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            userRefreshToken = [...newRefreshTokenArray, newRefreshToken]
            await redis.json.set(`helios_customer_db:session:${user}`,'.',{
                email:user,
                refreshToken:userRefreshToken
            })
            return null
            
        }

        userRefreshToken = [...newRefreshTokenArray, newRefreshToken]
        
        await redis.json.set(`helios_customer_db:session:${user}`,'.',{
            email:user,
            refreshToken:userRefreshToken
        }) 

        return newRefreshToken;        
    }
    catch(e){
        throw e
    }
}

exports.handleRefreshToken = async({
    cookies,

}) => {
    try{

    }   
    catch(e){
        throw e
    }
}