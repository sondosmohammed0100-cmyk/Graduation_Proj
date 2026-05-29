const JWT=require('jsonwebtoken')
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
module.exports=generateToken;