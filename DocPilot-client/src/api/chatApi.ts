import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function chatApi(requestObject: any) {
  const userJson = localStorage.getItem("user");
  const accessToken = userJson ? JSON.parse(userJson).token : null;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/open-ai/chat`,
      requestObject,
      { headers: headers }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
}
