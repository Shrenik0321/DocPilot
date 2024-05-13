import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function deletePost(requestObject: Object) {
  const userJson = localStorage.getItem("user");
  const accessToken = userJson ? JSON.parse(userJson).token : null;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
