import { useCallback, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createPost,
  createReply,
  deletePost,
  toggleBookmarkPost,
  toggleLikePost,
  toggleSharePost,
} from "../services/postsService";
import { updatePostField } from "../helper/updateQueryData";

export const useCreatePost = (
  postId,
  isReply = false,
  authorName,
  inReplyModal = false,
  queryType,
  refetch = false
) => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const imgRef = useRef(null);

  const postMutate = useMutation({
    mutationFn: isReply ? createReply : createPost,
    onSuccess: (data) => {
      setText("");
      setImages([]);
      setPreviewImages([]);
      toast.success("Post created successfully");
      if (refetch) {
        queryClient.invalidateQueries({ queryKey: ["posts", queryType] });
      }
      if (isReply) {
        const { numberReplies } = data;

        if (inReplyModal) {
          queryClient.setQueryData(["posts", queryType], (existingPosts) => {
            return {
              ...existingPosts,
              posts: existingPosts.posts.map((currentPost) => {
                if (currentPost._id === postId) {
                  return { ...currentPost, userReplies: numberReplies };
                }
                return currentPost;
              }),
            };
          });
        } else {
          queryClient.setQueryData(["post", postId], (oldData) => {
            if (!oldData) return;
            return {
              ...oldData,
              userReplies: numberReplies,
            };
          });
          queryClient.invalidateQueries({
            queryKey: ["post", postId, "reply"],
          });
        }
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text && images.length === 0) {
      toast.error("Missing post content");
      return;
    }

    const postData = new FormData();
    if (isReply) {
      postData?.append("notificationType", "reply");
      postData.append("parentPost", postId);
      postData.append("authorName", authorName);
    }
    postData.append("text", text);
    images.forEach((image) => postData.append("images", image));

    postMutate.mutate(postData);
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    // Kiểm tra kích thước file
    const oversizedFiles = files.filter((file) => {
      return file.size > maxFileSize;
    });
    if (oversizedFiles.length > 0) {
      return toast.error(
        "One or more images are too large! Please select images smaller than 5MB."
      );
    }

    if (files.length + images.length > 4) {
      return toast.error("Maximum number of images reached!");
    }

    const newPreviewImagesPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Resolve với kết quả từ FileReader
        reader.onerror = (error) => {
          console.error("FileReader error:", error);
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    // Sử dụng Promise.all để chờ tất cả các ảnh được đọc hoàn tất
    Promise.all(newPreviewImagesPromises)
      .then((newImages) => {
        if (images.length + newImages.length <= 4) {
          setImages((prevImages) => [...prevImages, ...files]);
          setPreviewImages((prevPreview) => [...prevPreview, ...newImages]);
        }
      })
      .catch((error) => console.error("Error loading images:", error));
  };

  const handleRemoveImage = useCallback(
    (index) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Xóa ảnh tại vị trí index
      setPreviewImages((prevPreview) =>
        prevPreview.filter((_, i) => i !== index)
      );
      imgRef.current.value = null; // Đặt lại input file
    },
    [images, previewImages]
  );

  return {
    postMutate,
    text,
    setText,
    images,
    previewImages,
    imgRef,
    handleSubmit,
    handleImgChange,
    handleRemoveImage,
  };
};

// TODO: Change to soft delete
export const useDeletePost = (queryType, postParam) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      toast.success("Post deleted successfully");
      if (!postParam) {
        queryClient.invalidateQueries({
          queryKey: ["posts", queryType],
        });
      } else {
        queryClient.setQueryData(["post", postParam], (oldData) => {
          if (!oldData) return;
          return {
            ...oldData,
            userReplies: data.numberReplies,
          };
        });
        queryClient.invalidateQueries({
          queryKey: ["post", postParam, "reply"],
        });
      }
    },
  });

  return deleteMutation;
};

export const useLikePost = (queryType, postId, inPostPage) => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: toggleLikePost,
    onSuccess: (data) => {
      const { likes } = data;
      // Đảm bảo queryType luôn là mảng
      const finalQueryType = Array.isArray(queryType) ? queryType : [queryType];

      if (inPostPage) {
        // Cập nhật query chi tiết bài đăng
        queryClient.setQueryData(["post", postId], (oldData) => {
          if (!oldData) return null;
          return {
            ...oldData,
            userLikes: likes,
          };
        });
      }

      updatePostField(
        queryClient,
        inPostPage ? ["post", ...finalQueryType] : ["posts", ...finalQueryType],
        postId,
        "userLikes",
        likes
      );
    },
    onError: (error) => {
      toast.error(`Error liking post: ${error.message}`);
    },
  });

  return likeMutation;
};

export const useSharePost = (queryType, postId, inPostPage, refetch) => {
  const queryClient = useQueryClient();

  const shareMutation = useMutation({
    mutationFn: toggleSharePost,
    onSuccess: (data) => {
      const { shares } = data;
      // Đảm bảo queryType luôn là mảng
      const finalQueryType = Array.isArray(queryType) ? queryType : [queryType];

      if (inPostPage) {
        queryClient.setQueryData(["post", postId], (oldData) => {
          if (!oldData) return;
          return {
            ...oldData,
            userShared: shares,
          };
        });
      }

      updatePostField(
        queryClient,
        inPostPage ? ["post", ...finalQueryType] : ["posts", ...finalQueryType],
        postId,
        "userShared",
        shares
      );

      if (refetch)
        queryClient.invalidateQueries({
          queryKey: ["posts", ...finalQueryType],
        });
    },
    onError: (error) => {
      toast.error(`Error sharing post: ${error.message}`);
    },
  });

  return shareMutation;
};

export const useBookmarkPost = (
  queryType = "bookmarks",
  postId,
  inPostPage
) => {
  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: toggleBookmarkPost,
    onSuccess: (data) => {
      const { userBookmarks } = data;
      // Đảm bảo queryType luôn là mảng
      const finalQueryType = Array.isArray(queryType) ? queryType : [queryType];

      if (inPostPage) {
        queryClient.setQueryData(["post", postId], (oldData) => {
          if (!oldData) return;
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          return {
            ...oldData,
            userBookmarks: userBookmarks,
          };
        });
      }

      updatePostField(
        queryClient,
        inPostPage ? ["post", ...finalQueryType] : ["posts", ...finalQueryType],
        postId,
        "userBookmarks",
        userBookmarks
      );

      queryClient.invalidateQueries({ queryKey: ["posts", "bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(`Error when bookmark: ${error.message}`);
    },
  });

  return bookmarkMutation;
};
