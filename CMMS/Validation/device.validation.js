const JOI = require('joi');

const deviceValidation = {
    body: JOI.object({
        name: JOI.string().min(2).max(50).trim().required(),
        serialNumber: JOI.string().min(2).max(50).trim(),
        manufacturer: JOI.string().min(2).max(50).trim().optional(),
        supplier: JOI.string().min(2).max(50).trim().optional(),
        status: JOI.string().valid('Working', 'Maintenance', 'Down').default('Working'),
        priority: JOI.string().valid('Critical', 'Normal').default('Normal'),
        purchaseDate: JOI.date().optional(),
        department: JOI.string().optional(),
        maintContract: JOI.string().optional()
    })
};

module.exports = deviceValidation;
