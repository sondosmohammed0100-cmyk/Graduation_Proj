const express = require('express');
const router = express.Router();

const { auth } = require('../Middelware/Auth_Middelware')
const validation = require('../Middelware/Validator_Middelware');
const sysRole=require('../Utils/SystemRoles')
const depValidation = require('../Validation/department.validation');
const { 
    AddingDepartment,
    getDepartment,
    getDepartmentById,
    updateDepartment,
    delete_Department 
} = require('../Controller/Department_Controller');


router.post("/department", validation(depValidation), auth([sysRole.ADMIN]), AddingDepartment);
router.get('/department', auth(), getDepartment);
router.get('/department/:id', auth(), getDepartmentById);
router.patch('/department/:id',  validation(depValidation),auth([sysRole.ADMIN]), updateDepartment);
router.delete('/department/:id', auth([sysRole.ADMIN]), delete_Department);
module.exports = router
