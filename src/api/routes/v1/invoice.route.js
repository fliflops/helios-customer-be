const router = require('express').Router();
const { authorize } = require('../../middlewares/auth');
const validate = require('express-validation');
const {getHeliosInvoice,getInvoice, receiveInvoice} = require('../../validations/invoice.validation');
const invoiceService = require('../../services/invoice.service/invoice.service');

router.route('/helios')
        .get(authorize,validate(getHeliosInvoice),async(req,res,next) => {
            try{

                const { rdd,principal } = req.query;
                //2022-08-03
                const {user_info} = req.processor;
                
                const invoices = await invoiceService.getAllInvoices({
                    filters:{
                        rdd,
                        principal_code:principal,
                        stc_code:user_info.stc_code
                    }
                })

                const data = await invoiceService.getAllHeliosInvoice({
                    filters:{
                        deliveryDate:rdd,
                        customerCode:principal,
                        brStatus:'HANDED_OVER_TO_TRUCKER',
                        shipToCode:user_info.stc_code
                    }
                })

                console.log(invoices)

                res.status(200).json({
                    data: data.filter(item => !invoices.map(inv => inv.invoice_no).includes(item.invoiceNo))
                })

            }
            catch(e){
                next(e)
            }
    })

router.route('/')
    .get(authorize,validate(getInvoice),async(req,res,next) => {
        try{
            const query = req.query;
            const {user_info} = req.processor;
    
            const data = await invoiceService.getPaginatedInvoices({
                filters:{
                    stc_code: user_info.stc_code,
                    ...query
                }
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
    .post(authorize,validate(receiveInvoice),async(req,res,next) => {
        try {

            const {invoices} = req.body;
            const {user_info} = req.processor;
               
            await invoiceService.receiveInvoice({
                data:invoices.map(item => {
                    return {
                        ...item,
                        createdBy:user_info.id
                    }
                })
            }) 

            res.status(200).json({
                message:'Invoices Received!',
                status:'success'
            })
        } 
        catch (e) {
            next(e)
        }
    })
module.exports = router