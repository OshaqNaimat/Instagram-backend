import express from "express";
import { addComment, addLikes, addPost, getPost } from "../controller/PostController.js";
export const postRouter = express.Router();

postRouter.post("/addPost/:user_id", addPost);
postRouter.get("/get-post", getPost);
postRouter.post("/add-comment/:post_id/:user_id",addComment )
postRouter.post("/add-likes/:post_id/:user_id",addLikes )
