const express=require('express');
const router=express.Router();

const {auth}=require('../Middelware/Auth_Middelware')
const validation=require('../Middelware/Validator_Middelware')
const depValidation=require('../Validation/department.validation');
const { AddingDepartment, getDepartment }= require('../Controller/Department_Controller');


router.post("/department",validation(depValidation),auth,AddingDepartment);
router.get('/department',auth,getDepartment);


module.exports=router
