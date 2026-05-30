const JOI = require('joi');

const maintReqValidation = {
    body: JOI.object({
        issueDescription: JOI.string().trim().required(),  
        priority: JOI.string().valid('Emergency', 'Normal').default('Normal'),
        status: JOI.string().valid('Pending', 'In Progress', 'Resolved').default('Pending'),
        device: JOI.string().length(24).required(),
        createdBy: JOI.string().length(24).required()    
    })
};

module.exports = maintReqValidation ;
