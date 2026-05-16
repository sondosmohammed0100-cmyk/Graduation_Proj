const JWT = require("jsonwebtoken");
const {asyncHandler} = require("../Utilities/AsyncHandler");
const userModel = require("../Model/User_Model");
const AppError = require("../Utilities/AppError");



const auth = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new AppError("Not authenticatied ", 401));
  }
  const decoded = JWT.verify(authorization, process.env.SECRET_KEY);
  //  console.log(decoded)
  req.user = decoded.userId;

  next();
});

module.exports = { auth };
