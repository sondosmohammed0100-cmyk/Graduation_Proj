const { valid } = require("joi");
const AppError = require('../Utilities/AppError')
const dataMethods = ['body', 'params', 'query', 'headers', 'file', 'files'];
const validation = (SchemaValidator) => {
    return (req, res, next) => {

        const validateErr = [];
        dataMethods.forEach(key => {
            if (SchemaValidator[key]) {

                const { error, value } = SchemaValidator[key].validate(req[key], {
                    abortEarly: false,
                    stripUnknown: true,
                });
                if (error) {
                    validateErr.push(error.details)
                }


            }
        });
        if (validateErr.length > 0) {
            return next(new AppError("Validation Error", 400))
        }

        return next()
    }

}
module.exports = validation
