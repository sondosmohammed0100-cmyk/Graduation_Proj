const JOI = require('joi');

const depValidation = {
    body: JOI.object({
        name: JOI.string().min(2).max(50).trim().required().lowercase(),
        location: JOI.string().min(2).max(50).trim().required()
    })
};
module.exports = depValidation ;
