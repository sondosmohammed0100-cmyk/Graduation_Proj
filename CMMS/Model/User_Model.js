const { required } = require('joi');
const mongoose =require('mongoose');
const userSchema=new mongoose.Schema({
  Fname:{
    type:String,
    required:true
  },
  Lname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    trime:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
    minlength:6

  },
  role:{
    type:String,
    enum:['Admin','Engineer','User'],
    default:'User'
  } 

});
const userModel=mongoose.model('User',userSchema)
module.exports=userModel;