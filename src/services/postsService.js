import api from "../helper/api";

// Hàm lấy danh sách posts
export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

// Hàm lấy danh sách posts theo người dùng đang theo dõi
export const getFollowingPosts = async () => {
  const response = await api.get("/posts/following");
  return response.data;
};

// Hàm tạo mới một post
export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};

// Hàm tạo mới một reply cho post
export const createReply = async (postId, replyData) => {
  const response = await api.post(`/posts/${postId}`, replyData);
  return response.data;
};

// // Hàm cập nhật một post
// export const updatePost = async (postId, postData) => {
//   const response = await api.put(`/posts/${postId}`, postData);
//   return response.data;
// };

// Hàm xóa một post
export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};
