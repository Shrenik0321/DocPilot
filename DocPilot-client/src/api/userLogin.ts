import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function userLogin(requestObject?: {
  limit: number;
  skip: number;
}) {
  try {
    const headers = {
      "Content-Type": "application/json",
      withCredentials: true,
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/auth/login`,
      requestObject,
      { headers: headers }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
}
