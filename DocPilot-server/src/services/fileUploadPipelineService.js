import Posts from "../models/postModel.js";

export const fileUploadPipelineService = async ({
  fileUploadName,
  fileUploadUrl,
}) => {
  try {
    const post = await Posts.create({
      fileName: fileUploadName,
      fileUrl: fileUploadUrl,
    });

    return {
      statusCode: 200,
      message: "File uploaded successfully",
      post,
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, message: "Internal server error" };
  }
};
