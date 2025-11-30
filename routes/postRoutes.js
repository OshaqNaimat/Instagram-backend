import express from "express";
import { addPost, getPost } from "../controller/PostController.js";
export const postRouter = express.Router();

postRouter.post("/addPost", addPost);
postRouter.get("/get-post", getPost);
