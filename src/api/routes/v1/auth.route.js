const router = require('express').Router();
const validate = require('express-validation');
const userService = require('../../services/user.service');
const authService = require('../../services/auth.service');

const APIError = require('../../errors/api-error');
const {
    login,
    logout,
    email,
    qr
} = require('../../validations/auth.validation');


router.route('/login')
.post(validate(login),async(req,res,next)=>{
    try{
        const data = req.body;
        const cookies = req.cookies;
        
        console.log(`cookies found ${cookies?.jwt}`)

        const {token,refreshToken,email} = await authService.authenticate({
            email:data.email,
            password:data.password
        })

        const validateRefreshToken =  await authService.validateRefreshToken({
            user:email,
            newRefreshToken:refreshToken,
            cookies
        })

        if(!validateRefreshToken) {
            res.clearCookie('jwt',{httpOnly:true, secure:true, sameSite:'none',maxAge: 24 * 60 * 60 * 1000})
        }

        res.cookie('jwt', refreshToken,{httpOnly:true, secure:true, sameSite:'none',maxAge: 24 * 60 * 60 * 1000})

        res.status(200).json({
            token,
            email
        })
    }
    catch(e){
        next(e)
    }
})

router.route('/qr')
.post(validate(qr),async(req,res,next)=>{
    try{
        const {qr_key,email} = req.body;

        const authQr = await authService.authenticateQrKey({
            qr_key,
            email
        })

        res.status(200).end()
    }
    catch(e){
        //res.clearCookie('jwt',{httpOnly:true, secure:true, sameSite:'none',maxAge: 24 * 60 * 60 * 1000})
        next(e)
    }
})

router.route('/logout')
.post(validate(logout),async(req,res,next)=> {
    try{
        const cookies = req.cookies;
        const {email} = req.body;
        if(!cookies?.jwt) return res.sendStatus(204); 
        
        const refreshToken = cookies.jwt;
        let getRedisRefreshToken = await authService.getUserRedisSession({email})
        // console.log(getRedisRefreshToken)
       
        let foundUser = await getRedisRefreshToken.find(t => t === refreshToken)
        //console.log(foundUser)

        if(!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        getRedisRefreshToken = getRedisRefreshToken.filter(rt => rt !== refreshToken)

        await authService.setUserRedisSession({
            email,
            data: {
                email,
                refreshToken:getRedisRefreshToken
            }
        })

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    }
    catch(e){
        next(e)
    }
})

router.route('/refresh')
.post()


//email verification
router.route('/register/:email')
.post(validate(email),async(req,res,nex)=>{

})

module.exports = router;