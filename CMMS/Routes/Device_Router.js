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


router.post("/device", validation(deviceValidation), auth,AddingDevice);
router.get('/device', auth,getDevice);
router.get('/device/:id', auth,getDeviceById);
router.patch('/device/:id', auth,updateDevice);
router.delete('/device/:id', auth,delete_Device);



module.exports = router
