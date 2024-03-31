import express from "express";
import {
  registerUserController,
  loginUserController,
  updateUserController,
  logoutUserController,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/update", updateUserController);
authRouter.post("/logout", logoutUserController);

export default authRouter;
