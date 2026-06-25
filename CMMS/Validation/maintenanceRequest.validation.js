const JOI = require('joi');


const maintReqValidation = {
    body: JOI.object({
        issueDescription: JOI.string().trim().min(5).required(),
        priority: JOI.string().valid('Emergency', 'Normal').default('Normal'),
        device: JOI.string().length(24).required()
    })
};




module.exports = maintReqValidation;