const router = require('express').Router();
const validate = require('express-validation');
const {authorize} = require('../../middlewares/auth');
const {register,emailConfirmation,getUser,approveUser} = require('../../validations/user.validation');

const userService = require('../../services/user.service');

router.route('/clients')
    .post(validate(register),async(req,res,next) => {
        try{
            const data = req.body;

            await userService.registerUser({
                filters:{
                    email:data.email
                },
                data
            })

            await userService.sendEmailConfirmation({
                user:{
                    email:data.email
                }
            })

            res.status(200).json({
                message:{
                    title:'Account Created!',
                    description:'An email was sent to your account for email confirmation',
                    status:'success'
                }
            })
        }
        catch(e){   
            next(e)
        }
    })
    .get(authorize,
        validate(getUser),
        async(req,res,next) => {
            try{
                const query = req.query;

                const data = await userService.getPaginatedClients({
                    filters:query
                })

                res.status(200).json({
                    count:data.count,
                    rows:data.rows,
                    pageCount: Math.ceil(data.count/query.pageSize)
                })  

            }
            catch(e){
                next(e)
        }
    })

//approve user data and sends the qr code to the user
router.route('/clients/:id')
    .put(authorize,validate(approveUser),async(req,res,next) => {
        try{
            const {id} = req.params;
            const data =req.body;
            const {user_info} = req.processor;

            if(data?.user_status === 'DECLINED'){
                await userService.declineUser({
                    data:{
                        ...data,
                        updatedBy:user_info.id
                    },
                    filters:{
                        id
                    }
                })
            }
            else {
                const userData = await userService.approveUser({
                    data:{
                        ...data,
                        principals: data.principals.map(item => {
                            return {
                                ...item,
                                createdBy:user_info.id
                            }
                        }),
                        updatedBy:user_info.id,
                    },
                    filters:{
                        id
                    }
                })

                // await userService.generateQRKey(userData)
            }

            res.status(200).end()
        }
        catch(e){
            next(e)
        }
    })
    

router.route('/confirm-email')
.post(validate(emailConfirmation),async(req,res,next)=> {
    try{
        const {token} = req.body;

        const result = await userService.verifyEmail(token)
        res.status(200).json({
            ...result
        })
    }
    catch(e){
        next(e)
    }
})



module.exports = router;