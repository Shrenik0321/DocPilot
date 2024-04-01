import { updateUserService } from "../services/userService.js";

export const getUserController = async (req, res) => {
  try {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const user = req.user;
    const userUpdate = req.body;

    const { statusCode, message } = await updateUserService(user, userUpdate);

    res.status(statusCode).json({ message });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
