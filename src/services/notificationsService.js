import api from "../helper/api";

export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

export const getMentions = async () => {
  const response = await api.get("/notifications/mentions");
  return response.data;
};

// TODO: Read/unread notifications,

//TODO: Only for Premium Users
export const deleteAllNotifications = async () => {
  const response = await api.delete(`/notifications`);
  return response.data;
};
export const deleteNotification = async (notificationId) => {
  const response = await api.delete(`/notifications/${notificationId}`);
  return response.data;
};
