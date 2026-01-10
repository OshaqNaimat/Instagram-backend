import express from "express";
import { postRouter } from "./routes/postRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import color from "colors";
import {Server} from "socket.io"
import http from "http"
import { connectDB } from "./config/connect.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { userRouter } from "./routes/userRoute.js";
import { messageRouter } from "./routes/messageRoute.js";
import { sellProduct } from "./routes/productRoute.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/products",sellProduct);
app.use(errorHandler);
connectDB();

// app.listen(process.env.PORT, () => {
//   console.log(`server is running on port ${process.env.PORT.cyan}`);
// });



const server = http.createServer(app)


const io = new Server(server,{
  cors:'http://localhost:5173'
})

io.on('connection',(socket)=>{
 console.log(`user connected on id ${socket.id}`)


socket.on("sent_message",(data)=>{
  socket.broadcast.emit("received_message",data)
})


// calling/receiving

socket.on("calling",(data)=>{
  socket.broadcast.emit("call_arahi_hai",(data))
})

// call declining

socket.on("call_declined",(data)=>{
  socket.broadcast.emit("nahi_uthai",data)
})

// call answer

socket.on("answer_call",(data)=>{
  socket.broadcast.emit("utha_li_ha",data)
})

// typing value
socket.on("typing",(data)=>{
    socket.broadcast.emit("likh_raha_ha",data)
})

// not typing 
socket.on("not_typing",(data)=>{
  socket.broadcast.emit("nahi_likh_raha",data)
})



})



server.listen(process.env.PORT,()=>{
  console.log(`Server started on port ${process.env.PORT}`)
})



