import { fileUploadPipelineService } from "../services/fileUploadPipelineService.js";
import { vectorisePdfDataFunc } from "../utils/vectorisePdfData.js";
import { uploadPdfToS3Func } from "../utils/uploadPdfToS3.js";
import { AWS_BUCKET_NAME } from "../config/envConfig.js";

export const fileUploadController = async (req, res) => {
  try {
    const fileUploadName = req.files["file"][0].originalname;

    const fileUploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileUploadName,
      Body: req.files["file"][0].buffer,
      ContentType: req.files["file"][0].mimetype,
    };

    const fileUploadUrl = await uploadPdfToS3Func(fileUploadParams);

    const { statusCode, message, post } = await fileUploadPipelineService({
      fileUploadName,
      fileUploadUrl,
    });

    vectorisePdfDataFunc(fileUploadUrl);

    return res.status(statusCode).json({ message: message, data: post });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
