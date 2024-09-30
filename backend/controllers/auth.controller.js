import bcryptjs from "bcryptjs";
import { User } from "../model/user.model.js";
import { generateVerificationCode } from "../utilities/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utilities/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("Please Provide All Things");
    }
    // Check if user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 12);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log(verificationToken);
    const newUser = new User({
      email,
      password: hashPassword,
      name,
      verificationToken: verificationToken,
      verificationTokenExpired: Date.now() + 24 * 60 * 60 * 1000,
    });
    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id); //this function used to generate the token and res is used for set the cookie
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const signin = async (req, res) => {
  res.send("Welcome to Sign In");
};
export const logout = async (req, res) => {
  res.send("welcome to logout");
};
