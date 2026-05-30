const JOI= require('joi');
const contractValidation = {
    body: JOI.object({
        nameCompany: JOI.string().trim().required().lowercase(),
        startDate: JOI.date().required(),
        endDate: JOI.date().greater(JOI.ref('startDate')).required(),
        companyPhone: JOI.string().trim().required()     
    })
};

module.exports = contractValidation ;