const QRCode = require('qrcode')
const generateQRCode=({data=''}={})=>{
    const qrcode=QRCode.toDataURL(JSON.stringify(data),
    {errorCorrectionLevel:'H'});
    return qrcode;

};
module.exports=generateQRCode;