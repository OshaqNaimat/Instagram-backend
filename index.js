import express from "express";
import { postRouter } from "./routes/postRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import color from "colors";
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
