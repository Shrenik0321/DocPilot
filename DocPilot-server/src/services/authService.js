import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUserService = async (userToRegister) => {
  try {
    // Check if user with the provided email already exists
    const existingUser = await Users.findOne({ email: userToRegister.email });

    if (existingUser) {
      return { statusCode: 409, message: "User already exists" };
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(userToRegister.password, 10);

    // Create a new user object with the hashed password
    const newUser = new Users({
      ...userToRegister,
      password: hashedPassword,
    });

    // Save the new user to the database
    const user = await newUser.save();

    if (user) {
      return {
        statusCode: 201,
        message: "Register successful",
        data: user,
      };
    } else {
      return {
        statusCode: 400,
        message: "Bad Request",
      };
    }
  } catch (err) {
    console.log(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};

export const loginUserService = async (userToLogin) => {
  try {
    // Find the user with the provided email
    const existingUser = await Users.findOne({ email: userToLogin.email });

    if (!existingUser) {
      return {
        statusCode: 401,
        message: "Email doesn't exist, SignUp",
      };
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      userToLogin.password,
      existingUser.password
    );

    if (!passwordMatch) {
      return {
        statusCode: 401,
        message: "Invalid email or password",
      };
    }

    return {
      statusCode: 200,
      message: "Login successful",
      data: existingUser,
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};
