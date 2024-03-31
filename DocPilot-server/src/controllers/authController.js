import {
  loginUserService,
  registerUserService,
  logoutUserService,
  updateUserService,
} from "../../services/authService.js";

export const registerUserController = async (req, res) => {
  try {
    const userToRegister = { ...req.body };

    const { statusCode, message } = await registerUserService(userToRegister);

    res.status(statusCode).json({ message });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const userToLogin = { ...req.body };

    const { statusCode, message } = await loginUserService(userToLogin);

    res.status(statusCode).json({ message });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const userToUpdate = { ...req.body };

    const { statusCode, message } = await updateUserService(userToUpdate);

    res.status(statusCode).json({ message });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    const logoutToUpdate = { ...req.body };

    const { statusCode, message } = await logoutUserService(logoutToUpdate);

    res.status(statusCode).json({ message });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
