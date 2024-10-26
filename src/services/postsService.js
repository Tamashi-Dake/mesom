import api from "../helper/api";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const getFollowingPosts = async () => {
  const response = await api.get("/posts/following");
  return response.data;
};

export const getPostsByUser = async (userId) => {
  const response = await api.get(`/user/${userId}/posts`);
  return response.data;
};

export const getLikesByUser = async (userId) => {
  const response = await api.get(`/user/${userId}/likes`);
  return response.data;
};

export const getPost = async (postId) => {
  const response = await api.get(`/post/${postId}`);
  return response.data;
};

export const getRepliesForPost = async (postId) => {
  const response = await api.get(`/post/${postId}/replies`);
  return response.data;
};

// Hàm tạo mới một post
export const createPost = async (postData) => {
  const response = await api.post("/post", postData);
  return response.data;
};

export const createReply = async (replyData) => {
  const response = await api.post(
    `/post/${replyData.get("parentPost")}`,
    replyData
  );
  return response.data;
};

// export const updatePost = async (postId, postData) => {
//   const response = await api.patch(`/post/${postId}`, postData);
//   return response.data;
// };

export const deletePost = async (postId) => {
  const response = await api.delete(`/post/${postId}`);
  return response.data;
};

export const toggleLikePost = async ({ postId, notificationType }) => {
  const response = await api.post(`/post/${postId}/like`, {
    notificationType,
  });
  return response.data;
};
export const toggleSharePost = async ({ postId, notificationType }) => {
  const response = await api.post(`/post/${postId}/share`, {
    notificationType,
  });
  return response.data;
};
