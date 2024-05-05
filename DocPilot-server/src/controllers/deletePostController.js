import { deletePostService } from "../services/deletePostService.js";

export const deletePost = async (req, res) => {
  try {
    const id = req.body.postId;

    const { statusCode, data, message } = await deletePostService(id);

    res.status(statusCode).json({ data, message });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
