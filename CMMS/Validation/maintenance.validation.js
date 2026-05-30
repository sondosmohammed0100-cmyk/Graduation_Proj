const JOI = require('joi');
const maintValidation = {
    body: JOI.object({
        type: JOI.string().valid('Preventive', 'Corrective', 'Calibration', 'Emergency').required(),
        maintenanceDate: JOI.date().default(Date.now).optional(),
        status: JOI.string().valid('Completed', 'In Progress', 'Pending').default('Pending'),
        notes: JOI.string().trim().optional(),
        device: JOI.string().length(24).required(),
        workOrder: JOI.string().length(24).required()
    })
};

module.exports = maintValidation;
