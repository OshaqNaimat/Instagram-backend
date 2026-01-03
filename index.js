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
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use(errorHandler);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT.cyan}`);
});



const server = http.createServer(app)


const io = new Server(server,{
  cors:'http://localhost:5173'
})

io.on('connection',(socket)=>{
 console.log(`user connected on id ${socket.id}`)
})

server.listen(5174,()=>{
  console.log(`Server started on port ${5174}`)
})