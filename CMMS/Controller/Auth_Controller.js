const userModel = require("../Model/User_Model");
const AppError = require("../Utils/AppError");
const sendEmail = require("../Utils/SendEmail");
const { asyncHandler } = require("../Utils/AsyncHandler");
const {
  RegisterSchema,
  LoginSchema,
} = require("../Validation/Auth_Validation");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

//=================================Register========================================

const Register = asyncHandler(async (req, res, next) => {
  const { Fname, Lname, email, password, role } = req.body;
  //  return console.log(Fname,Lname,email,password,role)
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return next(new AppError("Email already existing", 409));
  }
  const hashPassword = await bcrypt.hash(password, 8);
  const newUser = await userModel.create({
    Fname,
    Lname,
    email,
    password: hashPassword,
    role,
  });

 //*****************Confirm Email***************************/
  
  const token = JWT.sign(
    { id: newUser._id, email: newUser.email },
    process.env.EMAIL_SECRET_KEY,
    { expiresIn: 60 * 5 },
  );
  const newConfirmtoken = JWT.sign(
    { id: newUser._id, email: newUser.email },
    process.env.EMAIL_SECRET_KEY,
    { expiresIn: "1d"},
  );



  const html = `<a href="http://localhost:3000/confirmEmail/${token}">Confirm Email</a>
 <br>
 <br>
 <a href="http://localhost:3000/newconfirmEmail/${newConfirmtoken}">Request new confirm email</a>`;

  await sendEmail({ to: email, subject: "Confirm Email", html });
  const user_res = await userModel.findById(newUser._id).select("-password -__v");

  
  return res.status(201).json({
    msg: "Created Sucessfully",
    UserInfo: user_res,
  });
});

const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  //console.log(token);
  const decoded = JWT.verify(token, process.env.EMAIL_SECRET_KEY);
  //console.log(decoded);
  const user = await userModel.findByIdAndUpdate(decoded.id, {
    confirmEmail: true,
  });
return res.json({msg:"Done"})
//   return user
//     ? res.redirect(`${req.protocol}://${req.headers.host}/login`)
//     : res.send(
//         `<a href="${req.protocol}://${req.headers.host}/signup">
//         ops click to signup
//       </a>`,
//       );
});

const NewconfirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  // console.log(token);
  const decoded = JWT.verify(token, process.env.EMAIL_SECRET_KEY);
  // console.log(decoded);
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.send(
      `<a href="${req.protocol}://${req.headers.host}/signup"> ops click to signup</a>`);
  }

  if (user.confirmEmail) {
    return res.redirect(`${req.protocol}://${req.headers.host}/login`);
  }
  const Newtoken = JWT.sign(
    { id: user._id, email: user.email },
    process.env.EMAIL_SECRET_KEY,
    { expiresIn: 60 * 2 },
  );

  const html = `<a href="${req.protocol}://${req.headers.host}/confirmEmail/${Newtoken}">Confirm Email
</a>`;

  await sendEmail({ to: user.email, subject: "Confirm Email", html });
  return res.send(`<p>Check your inbox now</p>`);
});










//======================================Login========================================

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
  const isMatch = await bcrypt.compare(password, User.password);
  if (!isMatch) {
    return next(new AppError("Email or Password wrong", 400));
  }

  if (!User.confirmEmail) {
    return next(new AppError("Please confirm your email first", 401));
  }
  const Token = JWT.sign(
    {
      role: User.role,
      userId: User._id,
    },
    process.env.SECRET_KEY,
    { algorithm:'HS256',
      expiresIn: "1h" },
  );

  return res.status(200).json({
    msg: "Done",
    Token,
  });
});

const getUser = asyncHandler(async (req, res, next) => {
  const users = await userModel.find().select("-password");
  res.status(200).json({ msg: "Done", users });
});
module.exports = { Register, Login, confirmEmail, getUser, NewconfirmEmail };
