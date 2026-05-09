const JOI = require("joi");
const RegisterSchema = JOI.object({
  Fname: JOI.string().required(),
  Lname: JOI.string().required(),
  email: JOI.string().required().email(),
  password: JOI.string().required(),
  cpassword: JOI.string().required().valid(JOI.ref("password")),
  role: JOI.string().valid("Admin", "Engineer", "User").default("User"),
});

const LoginSchema = JOI.object({
  email: JOI.string().required().email(),
  password: JOI.string().required(),
});
module.exports = { RegisterSchema, LoginSchema };
