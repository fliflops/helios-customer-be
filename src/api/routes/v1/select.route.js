const router = require('express').Router();
const {authorize} = require('../../middlewares/auth');

const selectService = require('../../services/select.service');

router.route('/ship-points')
    .get(authorize,async(req,res,next)=> { 
        try{
            const data = await selectService.getAllShipPoints()
            res.status(200).json({data})
        }   
        catch(e){
            next(e)
        }
        
    })
router.route('/principals')
    .get(authorize,async(req,res,next)=> {
        try{
            const data = await selectService.getAllPrincipals()

            res.status(200).json({data})
        }
        catch(e){
            next(e)
        }
    })
router.route('/consignee')
    .get(authorize,async(req,res,next)=> {
        try{
            const data = await selectService.getAllConsignee()

            res.status(200).json({data})
        }
        catch(e){
            next(e)
        }
    })
router.route('/principal-user')
    .get(authorize,async(req,res,next)=> {
        try{
            const {user_info} = req.processor;
            const data = await selectService.getAllUserPrincipal(user_info.id)
            res.status(200).json({data})
        }
        catch(e){
            next(e)
        }
    })
module.exports = router