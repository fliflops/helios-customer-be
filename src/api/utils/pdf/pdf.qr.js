// const pdfDocument = require('pdfkit');
const {jsPDF} = require('jspdf');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const QRCode  = require('qrcode');
const Canvas = require('canvas')

// const path = __dirname;
const getBase64Image = (text) => {
    const canvas = new Canvas.Canvas(200,200);
    QRCode.toCanvas(canvas,text,(error) => {
        if (error) console.error(error)
    })

    return canvas.toBuffer('image/png');
}

module.exports = (token) => {
    try{
        const doc = new jsPDF({
            orientation:'portrait',
            unit:'in'
        })
    
        doc.addImage(getBase64Image(token),'png',1,1,2.5,2.5)
    
        return doc.output('arraybuffer')
    }
    catch(e){
        throw e
    }
    
}