import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/awsS3Config.js";

export const deletePdfFromS3Func = async (fileDeleteParams) => {
  const command = new DeleteObjectCommand(fileDeleteParams);

  const response = await s3.send(command);

  return response;
};
