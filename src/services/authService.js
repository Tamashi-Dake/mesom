import api from "../helper/api";

// Register
export const register = async (registerData) => {
  const response = await api.post("/auth/register", registerData);
  return response.data;
};

// Login
export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
