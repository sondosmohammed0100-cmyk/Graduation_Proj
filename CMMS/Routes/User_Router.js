const {Register,Login,getUser}=require('../Controller/Auth_Controller')
const express=require('express');
const route=express.Router();
const {auth}=require('../Middelware/Auth_Middelware')
route.post('/register',Register)

route.post('/login',Login)
route.get('/user',auth,getUser)
module.exports=route