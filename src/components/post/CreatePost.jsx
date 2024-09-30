import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "../../hooks/useCurrentUser";

import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { createPost } from "../../services/postsService";
import { gridImages } from "../shared/config";
import { twMerge } from "tailwind-merge";

const CreatePost = ({ refetch = true, postType, isReply }) => {
  const queryClient = useQueryClient();

  const currentUser = useCurrentUser();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const imgRef = useRef(null);

  //   TODO: Refactor to usePost hook
  const postMutate = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setText("");
      setImages([]);
      setPreviewImages([]);
      toast.success("Post created successfully");
      // TODO: might have to add url in queryKey - tạo reply không bị refetch trong post khác
      if (refetch)
        queryClient.invalidateQueries({ queryKey: ["posts", ...postType] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text && images.length == 0) {
      toast.error("Missing post content");
      return;
    }

    const postData = new FormData();
    postData.append("text", text);

    images.forEach((image) => {
      postData.append("images", image);
    });

    postMutate.mutate(postData);
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files); // Lấy tất cả các file
    if (files.length + images.length > 4) {
      return toast.error("Maximum number of images reached!");
    }

    // thêm ảnh vào post
    setImages((prevImages) => [...prevImages, ...files]);

    const newPreviewImagesPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result); // Resolve với kết quả từ FileReader
        };
        reader.onerror = reject; // Reject nếu có lỗi
        reader.readAsDataURL(file);
      });
    });

    // Sử dụng Promise.all để chờ tất cả các ảnh được đọc hoàn tất
    Promise.all(newPreviewImagesPromises)
      .then((newImages) => {
        if (images.length + newImages.length <= 4) {
          setPreviewImages((prevImages) => [...prevImages, ...newImages]); // Cập nhật state với danh sách ảnh mới
        }
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index); // Xóa ảnh tại vị trí index
    const newPreviewImages = previewImages.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newPreviewImages);
    imgRef.current.value = null; // Đặt lại input file
  };

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar ">
        <div className="w-8 rounded-full">
          <img
            src={
              currentUser.data?.profile.avatar || "https://placehold.co/400x400"
            }
          />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-0 text-lg resize-none focus:outline-none "
          placeholder={isReply ? "Post your reply" : "What's happening?"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {images.length > 0 && (
          <div
            className={`grid gap-[2px] rounded-lg overflow-hidden ${
              gridImages[images.length - 1]
            }`}
          >
            {previewImages.map((img, index) => (
              <div
                key={index}
                className={`relative group ${
                  images.length === 3 && index === 0 ? "row-span-2" : ""
                }`}
              >
                <IoCloseSharp
                  className="absolute top-1 right-1 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                />
                <img
                  src={img}
                  className={`w-full h-full ${
                    images.length === 1 ? "object-contain" : "object-cover"
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between  py-2 ">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <input
            type="file"
            accept="image/*,image/gif"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
            multiple // Cho phép chọn nhiều ảnh
          />
          <button
            disabled={text || images.length > 0}
            className={twMerge(
              "bg-sky-500 rounded-full btn-sm text-white px-4",
              text || images.length > 0
                ? ""
                : "bg-sky-500/50 cursor-not-allowed"
            )}
          >
            {postMutate.isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {postMutate.isError && (
          <div className="text-red-500">{postMutate.error.message}</div>
        )}
      </form>
    </div>
  );
};
export default CreatePost;
