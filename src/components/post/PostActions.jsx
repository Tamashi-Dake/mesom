import { twMerge } from "tailwind-merge";

import useCurrentUser from "../../hooks/useCurrentUser";
import { useModal } from "../../hooks/useModal";
import {
  useBookmarkPost,
  useLikePost,
  useSharePost,
} from "../../hooks/usePost";

import { omit } from "../../helper/omit";

import ReplyModal from "../modal/ReplyModal";

import { FaHeart, FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { IoShareOutline } from "react-icons/io5";

const PostActions = ({ post, queryType }) => {
  const { postId: postParam } = useParams();
  const inPostPage = postParam ? true : false;
  const keysToOmit = [
    "userLikes",
    "userShared",
    "userReplies",
    "tags",
    "views",
  ];
  const simplifiedPost = omit(post, keysToOmit);

  // tách route home và post/:id
  const [debouncedPending, setDebouncedPending] = useState(false);

  const currentUser = useCurrentUser();
  const replyModal = useModal();

  const isLiked = post.userLikes.includes(currentUser.data._id);
  const isShared = post.userShared.includes(currentUser.data._id);
  const isBookmarked = currentUser.data.bookmarks.includes(post._id);

  const likeMutation = useLikePost(queryType, post._id, inPostPage);
  const shareMutation = useSharePost(queryType, post._id, inPostPage);
  const bookmarkMutation = useBookmarkPost(queryType, post._id, inPostPage);
  const mutatePending =
    likeMutation.isPending ||
    shareMutation.isPending ||
    bookmarkMutation.isPending;

  useEffect(() => {
    if (mutatePending) {
      setDebouncedPending(true);
      const timeoutId = setTimeout(() => setDebouncedPending(false), 500);
      return () => clearTimeout(timeoutId);
    } else setDebouncedPending(false);
  }, [mutatePending]);

  const handleReply = (event) => {
    event.preventDefault();
    replyModal.openModal();
  };

  const handleLikePost = (event) => {
    event.preventDefault();
    if (debouncedPending) return;
    likeMutation.mutate({ postId: post._id, notificationType: "like" });
  };

  const handleSharePost = (event) => {
    event.preventDefault();
    if (debouncedPending) return;
    shareMutation.mutate({ postId: post._id, notificationType: "share" });
  };

  const handleBookmark = (event) => {
    event.preventDefault();
    if (debouncedPending) return;
    bookmarkMutation.mutate({ postId: post._id });
  };

  // TODO: invalidate queries cho mỗi actions
  // + Chuyển thành button + disable tránh spam
  return (
    <div className="flex justify-between mt-2">
      <div className="flex gap-4 items-center w-4/5 justify-between">
        <Button
          className={twMerge(
            "flex gap-1 items-center group ",
            postParam ? "cursor-not-allowed" : ""
          )}
          onClick={postParam ? null : handleReply}
        >
          <span className="w-8 h-8 p-2 group-hover:bg-sky-500/10 rounded-full  transition-all ease-in-out">
            <FaRegComment className=" text-slate-500 group-hover:text-sky-400 " />
          </span>

          <span className="text-sm text-slate-500 group-hover:text-sky-400">
            {post.userReplies > 0 ? post.userReplies : ""}
          </span>
        </Button>
        {replyModal.open && (
          <ReplyModal
            modal={replyModal}
            post={simplifiedPost}
            queryType={queryType}
          />
        )}
        <Button
          className={twMerge(
            "flex gap-1 items-center group",
            mutatePending && "cursor-not-allowed"
          )}
          disabled={mutatePending}
          onClick={handleSharePost}
        >
          <span className="w-8 h-8 flex justify-center items-center group-hover:bg-green-500/10 rounded-full transition-all ease-in-out">
            <BiRepost
              className={twMerge(
                "w-6 h-6 text-slate-500 group-hover:text-green-500 ",
                isShared ? "text-green-500" : ""
              )}
            />
          </span>
          <span className="text-sm text-slate-500 group-hover:text-green-500">
            {post.userShared.length > 0 ? post.userShared.length : ""}
          </span>
        </Button>
        <Button
          className={twMerge(
            "flex gap-1 items-center group",
            mutatePending && "cursor-not-allowed"
          )}
          disabled={mutatePending}
          onClick={handleLikePost}
        >
          <span className="w-8 h-8 p-2 flex justify-center items-center group-hover:bg-pink-500/10 rounded-full transition-all ease-in-out">
            {!isLiked && (
              <FaRegHeart className=" text-slate-500 group-hover:text-pink-500 " />
            )}
            {isLiked && <FaHeart className=" text-pink-500 " />}
          </span>

          <span
            className={`text-sm  group-hover:text-pink-500 ${
              isLiked ? "text-pink-500" : "text-slate-500"
            }`}
          >
            {post.userLikes.length > 0 ? post.userLikes.length : ""}
          </span>
        </Button>
        <Button
          className={twMerge(
            "flex gap-1 items-center group",
            mutatePending && "cursor-not-allowed"
          )}
          disabled={mutatePending}
          onClick={handleBookmark}
        >
          <span className="w-8 h-8 p-2 flex justify-center items-center group-hover:bg-blue-500/10 rounded-full transition-all ease-in-out">
            {!isBookmarked && <FaRegBookmark className=" text-slate-500" />}
            {isBookmarked && <FaBookmark className=" text-blue-500" />}
          </span>

          <span
            className={`text-sm group-hover:text-blue-500 ${
              isBookmarked ? "text-blue-500" : "text-slate-500"
            }`}
          >
            {post.userBookmarks > 0 ? post.userBookmarks : ""}
          </span>
        </Button>
      </div>
      <Button
        className={twMerge(
          "flex w-1/5 justify-end items-center group",
          mutatePending && "cursor-not-allowed"
        )}
        disabled={mutatePending}
        onClick={(e) => {
          e.preventDefault();
          alert("Share options");
        }}
      >
        <span className="w-8 h-8 p-2 flex justify-center items-center group-hover:bg-blue-500/10 rounded-full transition-all ease-in-out">
          <IoShareOutline className=" text-slate-500" />
        </span>
      </Button>
    </div>
  );
};

export default PostActions;
