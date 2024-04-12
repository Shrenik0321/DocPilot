import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshController,
} from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { getUserController } from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/refresh", requireAuth, refreshController, getUserController);
authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);

export default authRouter;
