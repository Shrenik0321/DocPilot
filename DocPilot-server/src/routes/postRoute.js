import express from "express";
import { fileUploadController } from "../controllers/fileUploadPipelineController.js";
import { filterPosts } from "../controllers/filterPostsController.js";
import { deletePost } from "../controllers/deletePostController.js";
import fileUploadMiddleware from "../middlewares/fileUploadMiddleware.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const fileRouter = express.Router();

fileRouter.post(
  "/upload-file",
  requireAuth,
  fileUploadMiddleware,
  fileUploadController
);
fileRouter.post("/filter-posts", requireAuth, filterPosts);
fileRouter.post("/delete-post", requireAuth, deletePost);

export default fileRouter;
