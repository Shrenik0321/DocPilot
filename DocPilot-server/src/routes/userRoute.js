import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/get-user", requireAuth, getUserController);
userRouter.post("/update-user", requireAuth, updateUserController);

export default userRouter;
