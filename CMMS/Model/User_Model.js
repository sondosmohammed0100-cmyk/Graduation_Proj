const { required } = require('joi');
const mongoose =require('mongoose');
const { confirmEmail } = require('../Controller/Auth_Controller');
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
  confirmEmail:{
    type:Boolean,
    default:false

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
