import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
