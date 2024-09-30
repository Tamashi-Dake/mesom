import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  deletePost,
  toggleLikePost,
  toggleSharePost,
} from "../services/postsService";

export const useDeletePost = (queryType) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts", queryType],
      });
    },
  });

  return deleteMutation;
};

export const useLikePost = (queryType, postId) => {
  const queryClient = useQueryClient();

  const likeMutate = useMutation({
    mutationFn: toggleLikePost,
    onSuccess: (data) => {
      const { likes } = data;

      queryClient.setQueryData(["posts", queryType], (existingPosts) => {
        return {
          ...existingPosts,
          posts: existingPosts.posts.map((currentPost) => {
            if (currentPost._id === postId) {
              return { ...currentPost, userLikes: likes };
            }
            return currentPost;
          }),
        };
      });
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error);
    },
  });

  return likeMutate;
};

export const useSharePost = (queryType, postId) => {
  const queryClient = useQueryClient();

  const likeMutate = useMutation({
    mutationFn: toggleSharePost,
    onSuccess: (data) => {
      const { shares } = data;

      queryClient.setQueryData(["posts", queryType], (existingPosts) => {
        return {
          ...existingPosts,
          posts: existingPosts.posts.map((currentPost) => {
            if (currentPost._id === postId) {
              return { ...currentPost, userShared: shares };
            }
            return currentPost;
          }),
        };
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return likeMutate;
};
