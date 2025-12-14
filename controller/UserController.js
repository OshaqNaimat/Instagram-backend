import { User } from "../models/UserModal.js";

export const registeruser = async (req, res) => {
  const { mobile, password, fullName, username } = req.body;
  if (!mobile || !password || !fullName || !username) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check email or mobile already exists
  let checkEmail = await User.findOne({ mobile });
  let checkUsername = await User.findOne({ username });

  if (checkEmail) {
    res.status(401);
    throw new Error("Email already in use!");
  }

  if (checkUsername) {
    res.status(401);
    throw new Error("Username already in use!");
  }

  let newUser = await User.create({
    mobile,
    password,
    fullName,
    username,
  });

  res.send(newUser);
};
