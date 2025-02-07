import api from "../helper/api";

export const searchUsers = async ({ query, skip }) => {
  const response = await api.get("/search/users", {
    params: {
      query: query,
      skip: skip,
    },
  });
  return response.data;
};

export const searchConversations = async ({ query, skip }) => {
  const response = await api.get("/search/conversations", {
    params: {
      query: query,
      skip: skip,
    },
  });
  return response.data;
};
