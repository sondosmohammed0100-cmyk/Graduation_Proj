require('dotenv').config()
const express=require('express');
const DB_Connection=require('./DBConnection/DBConnection')
const {globalErrHandler}=require('./Utils/AsyncHandler')
const DevicesReport=require('./Utils/Schadual_job')
const app=express();
const cors=require('cors');
app.use(cors())
app.use(express.json());
//****************************Routers**************************************/
const UserRoute=require('./Routes/User_Router');
const sendEmail =require('./Utils/SendEmail');
const DeviceRouter=require('./Routes/Device_Router');
const DepartmentRouter=require('./Routes/Department_Router');
const ContractRouter=require('./Routes/Contract_Router');



//**********************************End_Points***********************************/
app.use('/api',UserRoute);
app.use('/api',DeviceRouter);
app.use('/api',DepartmentRouter);
app.use('/api',ContractRouter);



app.use('/uploads',express.static('./Uploads'));
/**********************************Services***************************************/
DevicesReport()
DB_Connection();
app.use(globalErrHandler);


/********************************************************************/
const port=process.env.PORT ||3000
app.listen(port,()=>{
  console.log(`Server listen on port---> ${port}`)

});