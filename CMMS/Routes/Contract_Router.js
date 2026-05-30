const express = require('express');
const router = express.Router();
const validation = require('../Middelware/Validator_Middelware')
const { auth } = require('../Middelware/Auth_Middelware')
const contractValidation = require('../Validation/Contract_validation');
const sysRole=require('../Utils/SystemRoles')
const {
    AddingContract,
    getContract,
    delete_Contract,
    updateContract,
    getContractById
} = require('../Controller/Contract_Controller');


router.post("/contract", validation(contractValidation), auth([sysRole.ADMIN]), AddingContract);
router.get('/contract', auth(), getContract);
router.get('/contract/:id', auth(), getContractById);
router.patch('/contract/:id', validation(contractValidation), auth([sysRole.ADMIN]), updateContract);
router.delete('/contract/:id', auth([sysRole.ADMIN]), delete_Contract);

module.exports = router
