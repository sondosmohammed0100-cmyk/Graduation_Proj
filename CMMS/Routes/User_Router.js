const express = require("express");
const route = express.Router();

const {
  Register,
  Login,
  confirmEmail,
  NewconfirmEmail,
  profilePicture,
  resetpassword,
  forgetpassword
} = require("../Controller/Auth_Controller");


const {
  RegisterSchema,
  LoginSchema,
  ForgetSchema,
  ResetSchema
} = require("../Validation/Auth_Validation");


const { multerCloud, allowedType } = require('../Service/multerCloud');
const { auth } = require("../Middelware/Auth_Middelware");
const validation = require("../Middelware/Validator_Middelware");

route.post("/register", validation(RegisterSchema),  Register);
route.post("/login", validation(LoginSchema), Login);
route.get("/confirmEmail/:token", confirmEmail);
route.get("/newconfirmEmail/:token", NewconfirmEmail);


route.post("/forget",validation(ForgetSchema),forgetpassword);
route.post("/reset/:token",validation(ResetSchema),resetpassword);


const upload = multerCloud(allowedType.Image).single('profile')
route.post("/profile",auth(), upload,profilePicture);
module.exports = route;
