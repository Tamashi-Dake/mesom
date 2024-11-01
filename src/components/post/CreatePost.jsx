import { twMerge } from "tailwind-merge";
import TextArea from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Picker from "@emoji-mart/react";

import useCurrentUser from "../../hooks/useCurrentUser";
import { useCreatePost } from "../../hooks/usePost";

import { gridImages } from "../shared/config";
import ProgressBar from "./ProgressBar";

import { CiFaceSmile, CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../shared/Button";
import { useOnClickOutside } from "usehooks-ts";

const CreatePost = ({ postId, isReply, refetch, queryType, onPost }) => {
  const currentUser = useCurrentUser();
  const { postId: postParam } = useParams();
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiData, setEmojiData] = useState(null);
  const emojiRef = useRef(null);
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
  // Sử dụng hook để ẩn Picker khi click ra ngoài
  useOnClickOutside(emojiRef, () => setShowEmoji(false));

  const inputLimit = currentUser.data?.verified ? 1000 : 350;
  const inputLength = text.length;
  const isCharLimitExceeded = inputLength > inputLimit;

  // TODO: Might need to change from online emoji to emoji-mart/data
  useEffect(() => {
    const fetchEmojiData = async () => {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
      );
      const data = await response.json();
      setEmojiData(data);
    };

    fetchEmojiData();
  }, []);

  // TODO: cần check khi reply trong Post page
  useEffect(() => {
    if (isReply) {
      !postId && toast.error("Missing parent post");
      if (postMutate.isSuccess && onPost) {
        onPost();
      }
    }
  }, [isReply, postId, postMutate.isSuccess]);

  const addEmoji = (e) => {
    // Tách các phần của unified
    const codePoints = e.unified.split("-");
    // Chuyển đổi từng phần thành mã code point
    const emoji = String.fromCodePoint(
      ...codePoints.map((code) => parseInt(code, 16))
    );

    // Cập nhật văn bản
    setText((prevText) => prevText + emoji);
  };

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar ">
        <div className="w-8 rounded-full">
          <img
            src={currentUser.data?.profile.avatarImg || "/placeholder.png"}
          />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        {/* TODO: Add Paste image from clipboard */}
        <TextArea
          maxLength={currentUser.data?.verified ? 1000 : 400}
          minRows={3}
          maxRows={7}
          className="w-full p-0 text-lg resize-none focus:outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300"
          placeholder={isReply ? "Post your reply" : "What's happening?"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {images.length > 0 && (
          <div
            className={`grid gap-[2px] rounded-lg overflow-hidden max-h-80 select-none ${
              gridImages[images.length - 1]
            }`}
          >
            {previewImages.map((img, index) => (
              <div
                key={index}
                className={`relative group h-full max-h-80 ${
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

        <div className="flex justify-between relative py-2 ">
          <div className="flex gap-1 items-center">
            <span onClick={() => imgRef.current.click()}>
              <CiImageOn className="fill-blue-500 hover:fill-blue-400 w-5 h-5 cursor-pointer" />
            </span>
            <span onClick={() => (showEmoji ? null : setShowEmoji(!showEmoji))}>
              <CiFaceSmile className="fill-blue-500 hover:fill-blue-400 w-5 h-5 cursor-pointer" />
            </span>
          </div>
          {showEmoji && (
            <div className="absolute top-[100%]" ref={emojiRef}>
              <Picker
                data={emojiData}
                emojiSize={20}
                emojiButtonSize={28}
                onEmojiSelect={addEmoji}
                maxFrequentRows={1}
                theme={"light"}
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*,image/gif"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
            multiple
          />
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-4"
              animate={
                inputLength
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
            >
              <ProgressBar
                inputLimit={inputLimit}
                inputLength={inputLength}
                isCharLimitExceeded={isCharLimitExceeded}
              />
            </motion.div>
            <Button
              label={postMutate.isPending ? "Posting..." : "Post"}
              disabled={(!text && images.length === 0) || isCharLimitExceeded}
              className={twMerge(
                text || images.length > 0
                  ? " hover:bg-sky-500/85"
                  : "bg-sky-500/50 "
              )}
            />
          </div>
        </div>
        {postMutate.isError && toast.error(postMutate.error.message)}
      </form>
    </div>
  );
};
export default CreatePost;
