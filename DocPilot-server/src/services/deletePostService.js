import Posts from "../models/postModel.js";
import { deletePdfFromS3Func } from "../utils/deletePdfFromS3.js";
import { AWS_BUCKET_NAME } from "../config/envConfig.js";

export const deletePostService = async (id) => {
  try {
    if (id) {
      const post = await Posts.findByIdAndDelete(id);

      if (!post) {
        return { statusCode: 404, message: "Post not found" };
      } else {
        const fileDeleteParams = {
          Bucket: AWS_BUCKET_NAME,
          Key: post.fileName,
        };

        await deletePdfFromS3Func(fileDeleteParams);

        return {
          statusCode: 200,
          data: post,
          message: "Post deleted successfully",
        };
      }
    }
  } catch (err) {
    console.log(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};
