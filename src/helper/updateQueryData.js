export const updatePostField = (
  queryClient,
  queryKey,
  postId,
  field,
  value,
) => {
  queryClient.setQueryData(queryKey, (existingData) => {
    if (!existingData) return;

    return {
      ...existingData,
      pages: existingData.pages.map((page) => ({
        ...page,
        posts: page.posts.map((currentPost) =>
          currentPost._id === postId
            ? { ...currentPost, [field]: value }
            : currentPost,
        ),
      })),
    };
  });
};
