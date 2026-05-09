const mongoose=require('mongoose');

const DB_Connection=async()=>{
 await mongoose.connect(process.env.DB_URL).then(
  console.log("Connected to DB")
 ).catch(err=>{
  console.log({msg:"Faild to connect to DB"})
 })
}
module.exports=DB_Connection;