require('dotenv').config()
const express=require('express');
const DB_Connection=require('./DBConnection/DBConnection')
const {globalErrHandler}=require('./Utils/AsyncHandler')
const app=express();
const cors=require('cors');
app.use(cors())
app.use(express.json());
const UserRoute=require('./Routes/User_Router');
app.use('/api',UserRoute);
app.use('/uploads',express.static('./Uploads'))

const sendEmail =require('./Utils/SendEmail')

// sendEmail({to:"sundus.mohamed14156@hsc.menofia.edu.eg",subject:"new subject",html:`<p>sondos</p>`});


DB_Connection();
app.use(globalErrHandler);
const port=process.env.PORT ||3000
app.listen(port,()=>{
  console.log(`Server listen on port---> ${port}`)

});