import { twMerge } from "tailwind-merge";

import useCurrentUser from "../../hooks/useCurrentUser";
import { useCreatePost } from "../../hooks/usePost";

import { gridImages } from "../shared/config";

import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CreatePost = ({ postId, isReply, refetch, queryType, onPost }) => {
  const currentUser = useCurrentUser();
  const { postId: postParam } = useParams();
  const inReplyModal = postParam ? false : true;

  const {
    postMutate,
    text,
    setText,
    images,
    previewImages,
    imgRef,
    handleSubmit,
    handleImgChange,
    handleRemoveImage,
  } = useCreatePost(postId, isReply, inReplyModal, queryType, refetch);

  // TODO: cần check khi reply trong Post page
  useEffect(() => {
    if (isReply) {
      !postId && toast.error("Missing parent post");
      if (postMutate.isSuccess && onPost) {
        onPost();
      }
    }
  }, [isReply, postId, postMutate.isSuccess]);

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
            disabled={!text && images.length === 0}
            className={twMerge(
              "bg-sky-500 rounded-full btn-sm text-white px-4",
              text || images.length > 0
                ? "cursor-pointer hover:bg-sky-500/85"
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
