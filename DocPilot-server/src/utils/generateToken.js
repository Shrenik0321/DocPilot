import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/envConfig.js";

const generateToken = ({ res, userId }) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
