import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function filterPosts() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/files/filter-posts`,
      {
        headers: headers,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}
