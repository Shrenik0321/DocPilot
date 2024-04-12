import {
  loginUserService,
  registerUserService,
} from "../services/authService.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/envConfig.js";

export const refreshController = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Authentication Failed" });
      }

      res.clearCookie("jwt");
      req.cookies["jwt"] = "";

      generateToken({ res, userId: user.userId });
      next();
    });

    // return res.status(200).json({ message: "Okay" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const registerUserController = async (req, res) => {
  try {
    const userToRegister = { ...req.body };

    const { statusCode, message, data } = await registerUserService(
      userToRegister
    );

    if (statusCode === 201) {
      const token = generateToken({ res, userId: data._doc._id });
      return res.status(statusCode).json({ message, data, token });
    } else {
      return res.status(statusCode).json({ message });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const userToLogin = { ...req.body };

    const { statusCode, message, data } = await loginUserService(userToLogin);
    if (statusCode === 200) {
      const token = generateToken({ res, userId: data._doc._id });

      const modifiedData = {
        name: data._doc.name,
        email: data._doc.email,
        token: token,
      };

      return res.status(statusCode).json({ message, data: modifiedData });
    } else {
      return res.status(statusCode).json({ message });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: "User Logged Out" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
