import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/envConfig.js";

const generateToken = ({ res, userId }) => {
  const token = jwt.sign({ userId }, ACCESS_TOKEN, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
