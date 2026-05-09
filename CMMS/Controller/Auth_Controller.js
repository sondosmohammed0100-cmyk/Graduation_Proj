const userModel = require("../Model/User_Model");
const AppError = require("../Utilities/AppError");
const { asyncHandler } = require("../Utilities/AsyncHandler");
const {
  RegisterSchema,
  LoginSchema,
} = require("../Validation/Auth_Validation");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Register = asyncHandler(async (req, res, next) => {
  const { error, value } = RegisterSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    return next(error);
  }
  const { Fname, Lname, email, password, role } = value;
  //  return console.log(Fname,Lname,email,password,role)
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return next(new AppError("Email already existing", 409));
  }
  const hashPassword = bcrypt.hashSync(password, 8);
  const newUser = await userModel.create({
    Fname,
    Lname,
    email,
    password: hashPassword,
    role,
  });
  // console.log(newUser)
  const user_res = await userModel
    .findById(newUser._id)
    .select("-password -__v");
  return res.status(201).json({
    msg: "Created Sucessfully",
    UserInfo: user_res,
  });
});

const Login = asyncHandler(async (req, res, next) => {
  const { error, value } = LoginSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    return next(error);
  }
  const { email, password } = value;
  const User = await userModel.findOne({ email });
  if (!User) {
    return next(new AppError("Please Register first", 401));
  }
  const isMatch=bcrypt.compareSync(password,User.password);
  if(!isMatch){
    return next(new AppError("Email or Password wrong",400))
  }

  const Token = JWT.sign(
    {
      role: User.role,
      userId: User._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
  );

  return res.status(200).json({
    msg: "Done",
   Token
  });
});

const getUser=asyncHandler(
  async(req,res,next)=>{
    const users=await userModel.find();
    res.status(200).json({msg:"Done",users})
  }
)
module.exports = {Register,Login,getUser};
