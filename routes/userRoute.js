import express from "express";
import { findUser, registeruser } from "../controller/UserController.js";

export const userRouter = express.Router();

userRouter.post("/register", registeruser);
userRouter.get('/find-user/:id',findUser)
