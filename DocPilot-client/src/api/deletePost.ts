import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function deletePost(requestObject: Object) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/files/delete-post`,
      requestObject,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}
