const JWT=require('jsonwebtoken')
//*****************Generate Token************************ */
const generateToken=({
    payload={},
    signature=process.env.DEFAULTSIGNITURE,
    expiresIn='1d'
}={})=>{
    
    if(!Object.keys(payload).length){
        return false
    }
    const token=JWT.sign(payload,signature,{expiresIn})
    return token;
}
//*****************Verify Token************************ */
const VerifyToken=({
    Token='',
    signature=process.env.DEFAULTSIGNITURE,
    
}={})=>{
    
    if(!Token){
        return false
    }
    const decoded=JWT.verify(Token,signature);
    
    return decoded;
}
module.exports={generateToken,VerifyToken};
