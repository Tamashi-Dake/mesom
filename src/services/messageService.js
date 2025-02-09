import api from "../helper/api";

export const getMessages = async ({ conversationId, skip }) => {
  const response = await api.get(`/conversation/${conversationId}/messages`, {
    params: {
      skip: skip,
    },
  });
  return response.data;
};
