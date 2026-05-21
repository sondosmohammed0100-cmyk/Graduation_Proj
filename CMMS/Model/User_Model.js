const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: true,
    trime: true,
    minlength: 3,
    maxlength: 8,
  },
  Lname: {
    type: String,
    required: true,
    trime: true,
    minlength: 3,
    maxlength: 8,
  },
  email: {
    type: String,
    required: true,
    trime: true,
    lowercase: true,
  },
  confirmEmail:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["Admin", "Engineer", "User"],
    default: "User",
  },
},{timestamps:true});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
