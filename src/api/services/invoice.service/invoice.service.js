const {heliosModels,models} = require('../../models');
const httpStatus = require('http-status');
const APIError = require('../../errors/api-error');

exports.getAllHeliosInvoice = async({
    filters
}) => {
    try{
        
        const data = await heliosModels.booking_request_hdr_tbl.getAllBookingRequest({
            ...filters
        })

        return data
    }
    catch(e){
        throw e
    }

}

exports.getPaginatedInvoices = async ({
    filters
}) => {
    try{
        const {pageSize,pageIndex,order,...newFilters} = filters;

        const data = await models.invoices_tbl.getPaginatedInvoices({
            filters:newFilters,
            order,
            page:pageIndex,
            totalPage:pageSize
        })

        console.log(data)

        return data
    }
    catch(e){
        throw e
    }
}

exports.getAllInvoices = async ({
    filters
}) => {
    try{
        const data = await models.invoices_tbl.getAllInvoices({
            ...filters
        })

        return data
    }
    catch(e){
        throw e
    }
}

exports.receiveInvoice = async({
    data
}) => {
    try{

        const getInvoices = await models.invoices_tbl.getAllInvoices({
            invoice_no: data.map(item => item.invoice_no)
        })

        if(getInvoices.length > 0) {
            throw new APIError({
                message:`Invoices ${getInvoices.map(item => item.invoice_no).join(',')} already exists!\nPlease refresh your browser`,
                httpStatus:httpStatus.BAD_REQUEST
            })
        }

        return await models.invoices_tbl.bulkCreateInvoices(data)
    }
    catch(e){
        throw e
    }

}