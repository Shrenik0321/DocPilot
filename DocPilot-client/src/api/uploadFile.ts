import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function uploadFile(formData: any) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/files/upload-file`,
      formData,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}
