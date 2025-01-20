import api from "../helper/api";

// export const getUserSettings = async () => {
//   const response = await api.get("/settings");
//   return response.data;
// };

export const getDisplaySettings = async () => {
  const response = await api.get(`/settings/display`);
  return response.data;
};

// export const updateUserSettings = async ({ postData }) => {
//   const response = await api.patch(`/settings`, postData);
//   return response.data;
// };

export const updateDisplaySettings = async ({ theme, accent }) => {
  const response = await api.patch(`/settings/display`, { theme, accent });
  return response.data;
};
