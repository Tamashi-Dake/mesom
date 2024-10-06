export const updatePostField = (
  queryClient,
  queryKey,
  postId,
  field,
  value
) => {
  queryClient.setQueryData(queryKey, (existingData) => {
    if (!existingData) return;

    return {
      ...existingData,
      posts: existingData.posts.map((currentPost) =>
        currentPost._id === postId
          ? { ...currentPost, [field]: value }
          : currentPost
      ),
    };
  });
};
