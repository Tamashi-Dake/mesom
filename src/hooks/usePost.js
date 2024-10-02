import { useCallback, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createPost,
  createReply,
  deletePost,
  toggleLikePost,
  toggleSharePost,
} from "../services/postsService";

export const useCreatePost = (
  postId,
  isReply = false,
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
    onSuccess: () => {
      setText("");
      setImages([]);
      setPreviewImages([]);
      toast.success("Post created successfully");
      if (refetch) {
        queryClient.invalidateQueries({ queryKey: ["posts", queryType] });
      }
      if (isReply) {
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
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
