const userModel = require("../Model/User_Model");
const AppError = require("../Utils/AppError");
const sendEmail = require("../Utils/SendEmail");
const { asyncHandler } = require("../Utils/AsyncHandler");
const bcrypt = require("bcrypt");

const cloudinary = require('../Utils/CloudinaryConfig');
const generateQRCode = require('../Utils/QRcode');
const { generateToken, VerifyToken } = require("../Utils/TokenFunction");

//=================================Register========================================

const Register = asyncHandler(async (req, res, next) => {

  if (!req.body) {

    return next(new AppError('Body is required', 400))
  }
  const { Fname, Lname, email, password, role } = req.body;

  // return console.log(Fname,Lname,email,password,role)

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


  const token = generateToken({
    payload: { id: newUser._id, email: newUser.email },
    signature: process.env.EMAIL_SECRET_KEY,
    expiresIn: 60 * 5
  });
  if (!token) {
    next(new AppError('payload is empty', 400))
  }


  const newConfirmtoken = generateToken({
    payload: { id: newUser._id, email: newUser.email },
    signature: process.env.EMAIL_SECRET_KEY,
    expiresIn: "1d"
  });
  if (!newConfirmtoken) {
    next(new AppError('payload is empty', 400))
  }


  const html = `<a href="http://localhost:3000/api/confirmEmail/${token}">Confirm Email</a>
 <br>
 <br>
 <a href="http://localhost:3000/api/newconfirmEmail/${newConfirmtoken}">Request new confirm email</a>`;

  await sendEmail({ to: email, subject: "Confirm Email", html });
  const user_res = await userModel.findById(newUser._id).select("-password -__v");


  return res.status(201).json({
    msg: "Created Sucessfully",
    UserInfo: user_res,
  });
});

const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  // console.log(token);

  const decoded = VerifyToken({ Token: token, signature: process.env.EMAIL_SECRET_KEY })

  if (!decoded) {
    return next(new AppError('Decoded faild', 400))
  }

  const user = await userModel.findByIdAndUpdate(decoded.id, {
    confirmEmail: true,
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }



  // return res.json({ msg: "Done" })
  return user
    ? res.redirect(`${req.protocol}://${req.headers.host}/api/login`)
    : res.send(
      `<a href="${req.protocol}://${req.headers.host}/api/register">
          ops click to signup
        </a>`,
    );
});

const NewconfirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;


  const decoded = VerifyToken({ Token: token, signature: process.env.EMAIL_SECRET_KEY })

  if (!decoded) {
    return next(new AppError('Decoded faild', 400))
  }


  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.send(
      `<a href="${req.protocol}://${req.headers.host}/api/register"> ops click to signup</a>`);
  }

  if (user.confirmEmail) {
    return res.redirect(`${req.protocol}://${req.headers.host}/api/login`);
  }

  const Newtoken = generateToken({
    payload: { id: user._id, email: user.email },
    signature: process.env.EMAIL_SECRET_KEY,
    expiresIn: 60 * 2
  });
  const html = `<a href="${req.protocol}://${req.headers.host}/api/confirmEmail/${Newtoken}">Confirm Email
</a>`;

  await sendEmail({ to: user.email, subject: "Confirm Email", html });
  return res.send(`<p>Check your inbox now</p>`);
});

//======================================Login========================================

const Login = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;
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

  const Token = generateToken({
    payload: {
      role: User.role,
      userId: User._id,
    },
    signature: process.env.SECRET_KEY,
    expiresIn: '1h'
  });
  if (!Token) {
    next(new AppError('payload is empty', 400))
  }
  User.token = Token;
  await User.save();
  const qrcode = await generateQRCode({ data: User });

  return res.status(200).json({
    msg: "Done",
    Token,
    qrcode
  });
});

const profilePicture = asyncHandler(async (req, res, next) => {

  if (!req.file) {
    return next(new AppError('Please upload a profile picture', 400));
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
    folder: `Users/Profiles/${req.user}`
  })
  const userUpdated = await userModel.findByIdAndUpdate(req.user,
    { profile: { public_id, secure_url } },
    { new: true }
  )
  if (!userUpdated) {
    await cloudinary.uploader.destroy(public_id)
  }
  return res.json({ msg: "Done uploaded", userUpdated })
});

module.exports = {
  Register,
  Login,
  confirmEmail,
  profilePicture,
  NewconfirmEmail
};
