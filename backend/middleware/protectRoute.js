import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "unotherized - non token provided " });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "unotherized - invalid token " });
    }
    //  return user data expect password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "user dosen't exist " });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export default protectRoute;
