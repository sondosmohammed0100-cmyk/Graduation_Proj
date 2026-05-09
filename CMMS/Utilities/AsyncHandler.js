const AppError=require('../Utilities/AppError')
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {

      return next(new AppError(err.message,err.stCode || 500))
      
    });
  };
};
const globalErrHandler = (err, req, res, next) => {
  return res
    .status(err.stCode || 400)
    .json({ msg: err.message, stack: err.stack });
};
module.exports = { asyncHandler, globalErrHandler };
