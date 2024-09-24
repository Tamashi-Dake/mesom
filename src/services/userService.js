import api from "../helper/api";

// Hàm lấy danh sách posts
export const getSuggestedUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const toggleFollow = async ({ userId, notificationType }) => {
  const response = await api.post(`/follow/${userId}`, { notificationType });
  return response.data;
};
