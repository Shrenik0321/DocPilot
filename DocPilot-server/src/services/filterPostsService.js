import Posts from "../models/postModel.js";

export const filterPostsService = async (filteredId) => {
  try {
    if (filteredId) {
      const post = await Posts.findById(filteredId);
      if (!post) {
        return { statusCode: 404, message: "Post not found" };
      }
      return {
        statusCode: 200,
        data: post,
        message: "Successfully fetched",
      };
    } else {
      const allPosts = await Posts.find();
      return {
        statusCode: 200,
        data: allPosts,
        message: "Successfully fetched",
      };
    }
  } catch (err) {
    console.log(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};
