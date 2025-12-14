import { User } from "../models/UserModal.js";

export const registeruser = async (req, res) => {
  const { mobile, password, fullName, username } = req.body;
  if (!mobile || !password || !fullName || !username) {
    req.status(400);
    throw new Error("Please fill all the fields");
  }

  let newUser = await User.create({
    mobile,
    password,
    fullName,
    username,
  });

  res.send(newUser);
};
