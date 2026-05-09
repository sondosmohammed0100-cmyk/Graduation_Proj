const express=require('express');
const DB_Connection=require('./DBConnection/DBConnection')
const {globalErrHandler}=require('./Utilities/AsyncHandler')
const app=express();
require('dotenv').config()
const cors=require('cors');
app.use(cors())
app.use(express.json());
const UserRoute=require('./Routes/User_Router');
app.use('/api',UserRoute);

DB_Connection();
app.use(globalErrHandler);
const port=process.env.PORT ||3000
app.listen(port,()=>{
  console.log(`Server listen on port ${port}`)

});