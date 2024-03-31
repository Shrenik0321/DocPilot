import { User } from "../src/models/authModel.js";

export const registerUserService = async (userToAdd) => {
  try {
    return {
      statusCode: 200,
      message: "Register successful",
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};

export const loginUserService = async (user) => {
  try {
    return {
      statusCode: 200,
      message: "Login successful",
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};

export const updateUserService = async (user) => {
  try {
    return {
      statusCode: 200,
      message: "Update successful",
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};

export const logoutUserService = async (user) => {
  try {
    return {
      statusCode: 200,
      message: "Logout successful",
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};
