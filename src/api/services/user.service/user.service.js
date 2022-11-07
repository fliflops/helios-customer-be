const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const {models} = require('../../models');
const APIError = require('../../errors/api-error');
const {pdfQR} = require('../../utils/pdf')
const {jwtMailerSecret,jwtMailerExpiration,jwtQrExpiration,jwtQrSecret,emailConfig} =require('../../../config/vars');
const {sequelize} = models;

exports.registerUser = async({filters,data}) => {
    try{
        const getUsers = await models.user_tbl.getUser({...filters})
        if(getUsers){
            throw new APIError({
                message:'Email already exists!',
                status:httpStatus.UNAUTHORIZED
            })
        }

        await models.user_tbl.create({
            ...data,
            user_type:'client',
            user_password: bcrypt.hashSync(data.password,bcrypt.genSaltSync(10))
        })
    }
    catch(e){
        throw e
    }
}

exports.declineUser = async({data,filters}) => {
    try{
        const getUser = await models.user_tbl.getUser({
            id:filters.id
        })
        
        if(!getUser){
            throw new APIError({
                message:'User not found!',
                status:httpStatus.BAD_REQUEST
            })
        }

        if(getUser.is_approved === 1) {
            throw new APIError({
                message:'User is already approved!',
                status:httpStatus.BAD_REQUEST
            })
        }

        if(['INACTIVE','DECLINED'].includes(getUser.user_status)){
            throw new APIError({
                message:'Invalid user status',
                status:httpStatus.BAD_REQUEST
            })
        }

        await models.user_tbl.updateUser({
            data:{
                ...data,
                is_approved:0,
                user_status:'DECLINED'
            },
            where:{
                ...filters
            }
        })
        
    }
    catch(e){
        throw e
    }
}

exports.approveUser = async({data,filters}) => {
    try{    
        const {principals,...client} = data
        
        //validations
        const getUser = await models.user_tbl.getUser({
            id:filters.id
        })

        if(!getUser){
            throw new APIError({
                message:'User not found!',
                status:httpStatus.BAD_REQUEST
            })
        }

        if(getUser.is_approved === 1) {
            throw new APIError({
                message:'User is already approved!',
                status:httpStatus.BAD_REQUEST
            })
        }

        if(getUser.is_verified === 0){
            throw new APIError({
                message:'Email not verified!',
                status:httpStatus.BAD_REQUEST
            })
        }

        if(['INACTIVE','DECLINED'].includes(getUser.user_status)){
            throw new APIError({
                message:'Invalid user status',
                status:httpStatus.BAD_REQUEST
            })
        }

        const qrHash = await bcrypt.hashSync(`data.user_password+moment().unix()`,bcrypt.genSaltSync(10));

        //Update and Insert Data to database
        await sequelize.transaction(async t => {
            await models.user_tbl.updateUser({
                data:{
                    ...client,
                    is_approved:1,
                    qr_key:qrHash
                },
                where:{
                    ...filters
                },
                options:{
                    transaction:t
                }
            })

            await models.user_principal_tbl.bulkCreateUserPrincipal({
                data:principals,
                options:{
                    transaction:t
                }
            })
            
        })

        const pdfBuffer = await generateQRPdf(qrHash);

        await sendQrEmail({
            userData:getUser,
            buffer:pdfBuffer
        })

        return getUser
       
    }
    catch(e){
        throw e
    }
}

const generateQRPdf = async(qr_key) => {
    try{    
        const jwtToken = jwt.sign({
            qr_key
        },
        jwtQrSecret,
        {
            expiresIn:jwtQrExpiration
        })

        return await pdfQR(jwtToken)
    }
    catch(e){
        throw e
    }
}

const sendQrEmail = async ({userData,buffer}) => {
    const {email,password,confirmationURL} = emailConfig;

    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:email,
            pass:password
        }
    })

    await transporter.sendMail({
        to:userData.email,
        subject:'QR Code - System Access',
        html:`Access Qr Code`,
        attachments:[
            {
                filename:'qr.pdf',
                content: Buffer.from(buffer)
            }
        ]
    })
}

exports.sendEmailConfirmation = async ({user}) => {
    try{
        const {email,password,confirmationURL} = emailConfig;

        const mailerToken = jwt.sign({
            email:user.email
        },
        jwtMailerSecret,
        {
            expiresIn:jwtMailerExpiration
        })

        const transporter = nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user: email,
                pass: password
            }
        })

        const url = `${confirmationURL}?token=${mailerToken}`;

        await transporter.sendMail({
            to:user.email,
            subject: 'Email Confirmation',
            html: `Click this <a href="${url}">link</a> to confirm your email`
        })

    }
    catch(e){
        throw e
    }
}

exports.verifyEmail = async(token) => {
    try{

        let err = {
            message:'Invalid token!',
            status:httpStatus.UNAUTHORIZED,
            isPublic:true
        }

        return jwt.verify(token, jwtMailerSecret,async (error,result) => {
            if(error) {
                throw new APIError(err)
            }

            //update the user info 
            //change the is verified flag to verified
            const getUser = await models.user_tbl.getUser({
                email: result.email
            })

            if(!getUser){
                err.message = 'Invalid User'
                throw new APIError(err)
            }


            if(getUser.is_verified === 1) {
                err.message = 'Email already verified'
                throw new APIError(err)
            }


            await models.user_tbl.update({
                is_verified: 1
            },  
            {
                where:{
                    email: result.email
                }
            })

            return {
                message:'Email verified!'
            }

        })
    }
    catch(e){
        throw e
    }
}

exports.getPaginatedClients = async({
    filters
}) => {
    try{
        const {pageSize,pageIndex,order,...newFilters} = filters;

        const data = await models.user_tbl.getPaginatedUser({
            filters:newFilters,
            order,
            page:pageIndex,
            totalPage:pageSize,
        })
    
        return data
    }
    catch(e){
        throw e
    }
}

