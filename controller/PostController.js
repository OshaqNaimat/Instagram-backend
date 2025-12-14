import { Post } from "../models/postModal.js";

export const addPost = async (req, res) => {
  const { image, filter, caption } = req.body;
  if (!image || !filter) {
    res.status(400);
    throw new Error("please provide all required fields");
  }

  // add to mongodb

  // let newPost = await Post.create({
  //   caption,
  //   filter,
  //   image,
  // });

  let newPost = await Post.create({
    caption,
    image,
    filter,
  });

  res.send(newPost);
};

export const getPost = async (req, res) => {
  let allPosts = await Post.find().sort({ createdAt: -1 });
  res.send(allPosts);
};
