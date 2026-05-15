const userModel = require("../Model/User_Model");
const AppError = require("../Utilities/AppError");
const sendEmail=require('../Utilities/SendEmail')
const { asyncHandler } = require("../Utilities/AsyncHandler");
const {
  RegisterSchema,
  LoginSchema,
} = require("../Validation/Auth_Validation");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Register = asyncHandler(async (req, res, next) => {
  
  const { Fname, Lname, email, password, role } = req.body;
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
 //Confirm Email
 const token=JWT.sign({id:newUser._id,email:newUser.email},process.env.EMAIL_SECRET_KEY,{expiresIn:60*5});
 const newConfirmtoken=JWT.sign({id:newUser._id,email:newUser.email},process.env.EMAIL_SECRET_KEY,{expiresIn:60*5});
 const html=`<a href="http://localhost:3000/confirmEmail/${token}">Confirm Email</a>
 <br>
 <br>
 <a href="http://localhost:3000/confirmEmail/${newConfirmtokentoken}">Request new confirm email</a>`
 await sendEmail({to:email,subject:'Confirm Email',html})
  const user_res = await userModel
    .findById(newUser._id)
    .select("-password -__v");
  return res.status(201).json({
    msg: "Created Sucessfully",
    UserInfo: user_res,
  });
});


const confirmEmail=asyncHandler(async(req,res,next)=>{
  const {token}=req.params;
  console.log(token);
  const decoded=JWT.verify(token,process.env.EMAIL_SECRET_KEY);
  console.log(decoded);
  const user=await userModel.findByIdAndUpdate(decoded.id,{confirmEmail:true})
  return user?res.redirect("${req.protocol}://${req.headers.host}/login"):res.send(`<a href="http://localhost:5000/signup">ops clike to signup</a>`)

});

const NewconfirmEmail=asyncHandler(
  async(req,res,next)=>{


  const {token}=req.params;
  console.log(token);
  const decoded=JWT.verify(token,process.env.EMAIL_SECRET_KEY);
  console.log(decoded);
  const user=await userModel.findById(decoded.id)
  if(!user){
    return res.send(`<a href="http://localhost:5000/signup">ops clike to signup</a>`)


  }
  if(user.confirmEmail){
    return res.redirect("${req.protocol}://${req.headers.host}/login");

  }
   const Newtoken=JWT.sign({id:newUser._id,email:newUser.email},process.env.EMAIL_SECRET_KEY,{expiresIn:60*2});
 
 const html=`<a href="http://localhost:3000/confirmEmail/${Newtoken}">Confirm Email</a>`
 

 await sendEmail({to:user.email,subject:'Confirm Email',html});
 return res.send(`<p>Check your inbox now</p>`)

}
 )





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
module.exports = {Register,Login,confirmEmail,getUser};
