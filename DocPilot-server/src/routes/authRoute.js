import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);

export default authRouter;
