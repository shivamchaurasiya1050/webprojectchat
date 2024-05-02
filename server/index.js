const express= require("express");
const app= express();
require("dotenv").config();
const http= require("http");
const {Server}= require("socket.io");
const cors= require("cors");
const PORT =process.env.PORT


app.use(cors());

app.get("/",(req,res)=>{
  res.send({message:"hello from index"})
});

const server= http.createServer(app);

const io= new Server(server,{
    cors:{
        origin:" http://localhost:3000",
        methods:["GET","POST"]
    },
});
io.on("connection",(socket)=>{
  //console.log(`User connected: ${socket.id}`)
socket.on("join_room",(data)=>{
 socket.join(data)
 //console.log(`User with ID: ${socket.id} joined room: ${data}`, new Date(Date.now()).toLocaleTimeString());
});

  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data)
  });
  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});
 


server.listen(PORT,()=>{
    console.log(`server is running on the port http://localhost:${PORT}`)
});                                                                                              
