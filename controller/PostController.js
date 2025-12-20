import { Post } from "../models/postModal.js";

export const addPost = async (req, res) => {
  const {user_id} = req.params

  if(!user_id){
    res.status(401)
    throw new Error("ID  required")
  }
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
    user_id
  });

  res.send(newPost);
};

export const getPost = async (req, res) => {
  let allPosts = await Post.find().populate('user_id','username image ').sort({createdAt: -1})
  res.send(allPosts);
};
