
const { asyncHandler } = require("../Utils/AsyncHandler");
const userModel = require("../Model/User_Model");
const AppError = require("../Utils/AppError");
const generateToken=require('../Utils/TokenFunction')

const auth = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new AppError("Not authenticatied ", 401));
  }
  try {
    const decoded = JWT.verify(authorization, process.env.SECRET_KEY, { algorithm: 'HS256' });
    //  console.log(decoded)
    req.user = decoded.userId;

  } catch (error) {
    if (error.message === 'jwt expired') {
      //refresh token
      const findUser = await userModel.findOne({ token: authorization });
      if (!findUser) {
        next(new AppError('wrong Token', 400))
      }

      const RefreshToken = generateToken({
        payload: { role: findUser.role, userId: findUser._id, },
        signature: process.env.process.env.SECRET_KEY,
        expiresIn: "7d"
      });
      if (!RefreshToken) {
        next(new AppError('payload is empty', 400))
      }

      findUser.token = RefreshToken;
      await findUser.save();
      return res.status(200).json({ msg: "Token refreshed", RefreshToken })
    }
    next(new AppError('Invalid Token'), 500)
  }

  next();
});

module.exports = { auth };
