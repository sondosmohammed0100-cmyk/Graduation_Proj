const JWT =require('jsonwebtoken');
const AppError=require('../Utils/AppError')
const socketMiddlware=(socket,next)=>{
  try{
    const token=socket.handshake.headers.token
    if(!token) return next (new AppError("Token not Found ",400));
    const decoded=JWT.verify(token,process.env.SECRET_KEY);
    socket.userId=decoded.userId;
    socket.role=decoded.role;
    next()
  }catch(err){
    return next(new AppError("Invalid Token",401))
  }


}
const chatController=(io)=>{
  io.use(socketMiddlware);
  io.on("connection",(socket)=>{
    console.log(`User ${socket.userId}& Role ${socket.role} is connected to Socket Server`);
    if(socket.role==="Admin"){
      socket.join("Room_Admin");

    }else if(socket.role==="BiomedicalEngineer") {
      socket.join(`room_Eng ${socket.userId}`)

    }
    else if(socket.role==="Technician") {
      socket.join(`room_Eng ${socket.userId}`)

    }
    else if(socket.role==="Staff") {
      socket.join(`room_Eng ${socket.userId}`)

    }
  //listen(server)------------->emit----------------->listen(user)
 //user send msg Admin
   socket.on("sendMsg",()=>{
    io.to("Room_Admin").emit("")


   })





  });

}
module.exports=chatController