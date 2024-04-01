import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const updateUserService = async (user, userUpdate) => {
  try {
    const existingUser = await Users.findById(user._id);

    if (existingUser) {
      for (const property in userUpdate) {
        if (property === "password") {
          const hashedPassword = await bcrypt.hash(userUpdate[property], 10);
          existingUser[property] = hashedPassword;
        } else {
          existingUser[property] = userUpdate[property];
        }
      }

      await existingUser.save();

      return {
        statusCode: 200,
        message: "Update successful",
      };
    } else {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};
