const router = require('express').Router();
const validate = require('express-validation');
const {authorize} = require('../../middlewares/auth');

router.route('/ship-points')
.get(authorize,async(req,res)=> {

})

router.route('/principal')
.get(authorize,async(req,res)=> {
    
})

router.route('/consignee')
.get(authorize,async(req,res)=> {
    
})