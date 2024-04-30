import express from "express";
// import { requireAuth } from "../middlewares/authMiddleware.js";
import { chatController } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.post("/chat", chatController);

export default chatRouter;
