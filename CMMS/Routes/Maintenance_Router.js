const express = require('express');
const router = express.Router();

const { auth } = require('../Middelware/Auth_Middelware');
const validation = require('../Middelware/Validator_Middelware');
const sysRole = require('../Utils/SystemRoles');

const maintReqValidation  = require('../Validation/maintenanceRequest.validation');
const maintValidation=require('../Validation/maintenance.validation');
const workOrderValidation=require('../Validation/workOrder.validation')

const {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
    deleteRequest
} = require('../Controller/MaintenanceReq_controller');

const {
    createWorkOrder,
    getAllWorkOrders,
    getWorkOrderById,
    updateWorkOrder,
    deleteWorkOrder
} = require('../Controller/WorkOrder_Controller');

const {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
} = require('../Controller/Maintenance_Controller');


router.post('/maintenance-request',
    auth([sysRole.STAFF]),
    validation(maintReqValidation),
    createRequest
);
router.get('/maintenance-request',
    auth([sysRole.ADMIN, sysRole.BIOMEDICAL_ENGINEER, sysRole.TECHNICIAN]),
    getAllRequests
);
router.get('/maintenance-request/:id',
    auth([sysRole.ADMIN, sysRole.BIOMEDICAL_ENGINEER, sysRole.TECHNICIAN]),
    getRequestById
);
router.patch('/maintenance-request/:id',
    auth([sysRole.ADMIN, sysRole.BIOMEDICAL_ENGINEER]),
    updateRequest
);
router.delete('/maintenance-request/:id',
    auth([sysRole.ADMIN]),
    deleteRequest
);

router.post('/work-order',
    auth([sysRole.ADMIN, sysRole.BIOMEDICAL_ENGINEER]),
    validation(workOrderValidation),
    createWorkOrder
);
router.get('/work-order',
    auth(),
    getAllWorkOrders
);
router.get('/work-order/:id',
    auth(),
    getWorkOrderById
);
router.patch('/work-order/:id',
    auth([sysRole.ADMIN, sysRole.BIOMEDICAL_ENGINEER]),
    validation(workOrderValidation),
    updateWorkOrder
);
router.delete('/work-order/:id',
    auth([sysRole.ADMIN]),
    deleteWorkOrder
);

router.post('/maintenance',
    auth([sysRole.ADMIN, sysRole.TECHNICIAN]),
    validation(maintValidation),
    createMaintenance
);
router.get('/maintenance',
    auth(),
    getAllMaintenance
);
router.get('/maintenance/:id',
    auth(),
    getMaintenanceById
);
router.patch('/maintenance/:id',
    auth([sysRole.ADMIN, sysRole.TECHNICIAN]),
    updateMaintenance
);
router.delete('/maintenance/:id',
    auth([sysRole.ADMIN]),
    deleteMaintenance
);

module.exports = router;