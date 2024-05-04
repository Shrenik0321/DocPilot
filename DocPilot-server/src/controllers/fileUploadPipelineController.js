import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY,
  AWS_BUCKET_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "../config/envConfig.js";
import { fileUploadPipelineService } from "../services/fileUploadPipelineService.js";
import { vectorisePdfDataFunc } from "../utils/vectorisePdfData.js";

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_BUCKET_REGION,
});

export const fileUploadController = async (req, res) => {
  try {
    const fileUploadName = req.files["file"][0].originalname;

    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileUploadName,
      Body: req.files["file"][0].buffer,
      ContentType: req.files["file"][0].mimetype,
    };

    const command = new PutObjectCommand(params);

    const response = await s3.send(command);

    if (response["$metadata"].httpStatusCode === 200) {
      const getObjectParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileUploadName,
      };

      const command = new GetObjectCommand(getObjectParams);

      const fileUploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 7 * 24 * 60 * 60,
      });

      const { statusCode, message, post } = await fileUploadPipelineService({
        fileUploadName,
        fileUploadUrl,
      });

      vectorisePdfDataFunc(fileUploadUrl);

      return res.status(statusCode).json({ message: message, data: post });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
