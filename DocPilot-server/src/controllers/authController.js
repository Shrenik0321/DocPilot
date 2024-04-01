import {
  loginUserService,
  registerUserService,
} from "../services/authService.js";
import generateToken from "../utils/generateToken.js";

export const registerUserController = async (req, res) => {
  try {
    const userToRegister = { ...req.body };

    const { statusCode, message, data } = await registerUserService(
      userToRegister
    );

    if (statusCode === 201) {
      generateToken({ res, userId: data._doc._id });
      return res.status(statusCode).json({ message, data });
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
      generateToken({ res, userId: data._doc._id });
      return res.status(statusCode).json({ message, data });
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
