const express=require('express');
const router=express.Router();
const validation=require('../Middelware/Validator_Middelware')
const {auth}=require('../Middelware/Auth_Middelware')
const contractValidation =require('../Validation/Contract_validation');
const {AddingContract,getContract}= require('../Controller/Contract_Controller');


router.post("/contract",validation(contractValidation),auth,AddingContract);
router.get('/contract',auth,getContract)

module.exports=router
