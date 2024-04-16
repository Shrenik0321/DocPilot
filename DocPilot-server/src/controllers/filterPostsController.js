import { filterPostsService } from "../services/filterPostsService.js";

export const filterPosts = async (req, res) => {
  try {
    const filteredId = req.body.id;

    const { statusCode, data, message } = await filterPostsService(filteredId);

    res.status(statusCode).json({ data, message });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
