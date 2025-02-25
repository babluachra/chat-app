import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "passwords do not match",
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "username already exist",
      });
    }

    //  hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  api for avatar

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    console.log("user created successfully");
    if (newUser) {
      // generate jwt token
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "invalid user data",
      });
    }
  } catch (error) {
    console.log("internal signup error", error.message);
    res.status(500).json({
      erorr: "internal server error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
    if (!user || !isPasswordCorrect ) {
      return res.status(400).json({error:"Invalid username or password"});
    }
    generateTokenAndSetCookie(user._id,res);

    res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      });
  } catch (error) {
    res.status(500).json({
      error: "server side error during login",
    });
  }
};
export const logout = (req, res) => {
  try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({
            message:"logout successfully"
        })

  } catch (error) {
    res.status(500).json({
        error: "server side error during login",
      });
  }
};
