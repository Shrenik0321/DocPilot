import { SERVER_URL, baseAxios } from "@/utils/axios";

export async function filterPosts() {
  const userJson = localStorage.getItem("user");
  const accessToken = userJson ? JSON.parse(userJson).token : null;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await baseAxios.post(
      `${SERVER_URL}/api/files/filter-posts`,
      {},
      {
        headers: headers,
      }
    );

    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/unauthorised";
    }
    throw error;
  }
}
