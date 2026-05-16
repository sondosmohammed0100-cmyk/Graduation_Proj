const {
  Register,
  Login,
  confirmEmail,
  NewconfirmEmail,
  getUser,
} = require("../Controller/Auth_Controller");
const {
  RegisterSchema,
  LoginSchema,
} = require("../Validation/Auth_Validation");
const express = require("express");
const route = express.Router();
const { auth } = require("../Middelware/Auth_Middelware");
const validation = require("../Middelware/Validator_Middelware");
route.post("/register", validation(RegisterSchema), Register);

route.post("/login", validation(LoginSchema), Login);
route.get("/confirmEmail/:token", confirmEmail);

route.get("/newconfirmEmail/:token", NewconfirmEmail);
route.get("/user", auth, getUser);
module.exports = route;
