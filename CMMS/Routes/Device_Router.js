const express = require('express');
const router = express.Router();

const {auth}=require('../Middelware/Auth_Middelware')
const deviceValidation = require('../Validation/device.validation');
const validation = require('../Middelware/Validator_Middelware')
const {
    AddingDevice,
    getDevice,
    getDeviceById,
    updateDevice,
    delete_Device
} = require('../Controller/Device_Controller');
const sysRole = require('../Utils/SystemRoles');


router.post("/device", validation(deviceValidation), auth([sysRole.ADMIN]),AddingDevice);
router.get('/device', auth(),getDevice);
router.get('/device/:id', auth(),getDeviceById);
router.patch('/device/:id',validation(deviceValidation) ,auth([sysRole.ADMIN]),updateDevice);
router.delete('/device/:id', auth([sysRole.ADMIN]),delete_Device);



module.exports = router
