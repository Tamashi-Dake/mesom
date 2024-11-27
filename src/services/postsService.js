import api from "../helper/api";

export const getPosts = async ({ skip }) => {
  const response = await api.get("/posts", {
    params: {
      skip: skip,
    },
  });
  return response.data;
};

export const getFollowingPosts = async ({ skip }) => {
  const response = await api.get("/posts/following", {
    params: {
      skip: skip,
    },
  });
  return response.data;
};

export const getUserBookmarks = async ({ skip }) => {
  const response = await api.get(`/posts/bookmarks`, {
    params: {
      skip: skip,
    },
  });
  return response.data;
};

export const getPostsByUser = async ({ userId, skip }) => {
  const response = await api.get(`/user/${userId}/posts`, {
    params: {
      skip: skip,
    },
  });
  return response.data;
};

export const getRepliesByUser = async ({ userId, skip }) => {
  const response = await api.get(`/user/${userId}/replies`, {
    params: {
      skip: skip,
    },
  });
  return response.data;
};

export const getMediasByUser = async ({ userId, skip }) => {
  const response = await api.get(`/user/${userId}/medias`, {
    params: {
      skip: skip,
    },
  });
  return response.data;
};

export const getLikesByUser = async ({ userId, skip }) => {
  const response = await api.get(`/user/${userId}/likes`, {
    params: {
      skip: skip,
    },
  });
  return response.data;
};

export const getPost = async (postId) => {
  const response = await api.get(`/post/${postId}`);
  return response.data;
};

export const getRepliesForPost = async ({ postId, skip }) => {
  const response = await api.get(`/post/${postId}/replies`, {
    params: {
      skip: skip,
    },
  });
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
    replyData,
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
export const toggleBookmarkPost = async ({ postId }) => {
  const response = await api.post(`/post/${postId}/bookmark`);
  return response.data;
};
export const increasePostView = async (postId) => {
  const response = await api.post(`/post/${postId}/increase-view`);
  return response.data;
};
