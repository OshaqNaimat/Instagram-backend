import express from "express";
import { findUser, getAllUsers, loginUser, registeruser } from "../controller/UserController.js";

export const userRouter = express.Router();

userRouter.post("/register", registeruser);
userRouter.post("/login", loginUser );
userRouter.get('/find-user/:id',findUser)
userRouter.get('/get-all-users',getAllUsers)