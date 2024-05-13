import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import { ACCESS_TOKEN } from "../config/envConfig.js";

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorised" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN);

    if (decoded.exp && Date.now() > decoded.exp * 1000) {
      return res
        .status(401)
        .json({ error: "Token expired, please log in again" });
    }

    const user = await Users.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token signature" });
    } else {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export { requireAuth };
