import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { AWS_BUCKET_NAME } from "../config/envConfig.js";
import { s3 } from "../config/awsS3Config.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadPdfToS3Func = async (fileUploadParams) => {
  const command = new PutObjectCommand(fileUploadParams);

  const response = await s3.send(command);

  if (response["$metadata"].httpStatusCode === 200) {
    const getObjectParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileUploadParams.Key,
    };

    const command = new GetObjectCommand(getObjectParams);

    const fileUploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 7 * 24 * 60 * 60,
    });

    return fileUploadUrl;
  }
};
