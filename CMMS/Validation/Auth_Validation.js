const JOI = require("joi");
const RegisterSchema = {
  body:JOI.object({
  Fname: JOI.string().required(),
  Lname: JOI.string().required(),
  email: JOI.string().required().email(),
  password: JOI.string().required(),
  cpassword: JOI.string().required().valid(JOI.ref("password")),
  role: JOI.string().valid("Admin", "BiomedicalEngineer", "Technician", "Staff").default("Staff")
})};

const LoginSchema = {
  body:JOI.object({
  email: JOI.string().required().email(),
  password: JOI.string().required(),
})};
module.exports = { RegisterSchema, LoginSchema };
