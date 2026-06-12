const { asyncHandler } = require("../Utils/AsyncHandler");
const userModel = require("../Model/User_Model");
const AppError = require("../Utils/AppError");
const { generateToken, VerifyToken } = require('../Utils/TokenFunction')
const auth = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(new AppError("Not authenticated", 401));
    }

    try {
      const decoded = VerifyToken({ Token: authorization, signature: process.env.SECRET_KEY }); 
      if (!decoded) {
        return next(new AppError('Decoded failed', 400));
      }

      req.user = decoded.userId;
      req.role = decoded.role;

      if (roles.length && !roles.includes(req.role)) { 
        return next(new AppError('Not authorized', 403));
      }
    

    } catch (error) {
      if (error.message === 'jwt expired') {
        const findUser = await userModel.findOne({ token: authorization });
        if (!findUser) {
          return next(new AppError('Wrong Token', 400));
        }

        const RefreshToken = generateToken({
          payload: { role: findUser.role, userId: findUser._id },
          signature: process.env.SECRET_KEY,
          expiresIn: "7d"
        });

        if (!RefreshToken) {
          return next(new AppError('payload is empty', 400));
        }

        findUser.token = RefreshToken;
        await findUser.save();
        return res.status(200).json({ msg: "Token refreshed", RefreshToken });
      }
      return next(new AppError('Invalid Token', 500)); 
    }

    next();
  });
};
module.exports = { auth };