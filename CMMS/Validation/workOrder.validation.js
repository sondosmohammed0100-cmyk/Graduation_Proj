const JOI = require('joi');
const workOrderValidation = {
    body: JOI.object({
        assignedDate: JOI.date().optional(),
        completionDate: JOI.date().greater(JOI.ref('assignedDate')).optional(),
        status: JOI.string().valid('Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled').default('Pending'),
        maintenanceRequest: JOI.string().length(24).required(),
        assignedEngineer: JOI.string().length(24).required(),
        assignedTechnician: JOI.string().hex().length(24).required()
    })
};

module.exports = workOrderValidation;
