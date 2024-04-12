import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import { ACCESS_TOKEN } from "../config/envConfig.js";

const requireAuth = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN);

      req.user = await Users.findById(decoded.userId).select("-password");

      next();
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ message: "Not Authorised, Invalid token" });
  }
};

export { requireAuth };
