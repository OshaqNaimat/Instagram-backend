import express from "express";
import { registeruser } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/register", registeruser);
