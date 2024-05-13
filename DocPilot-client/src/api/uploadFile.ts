import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function uploadFile(formData: any) {
  const userJson = localStorage.getItem("user");
  const accessToken = userJson ? JSON.parse(userJson).token : null;

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
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
