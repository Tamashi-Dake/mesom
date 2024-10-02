import { twMerge } from "tailwind-merge";

import useCurrentUser from "../../hooks/useCurrentUser";
import { useModal } from "../../hooks/useModal";
import { useLikePost, useSharePost } from "../../hooks/usePost";

import { omit } from "../../helper/omit";

import ReplyModal from "../modal/ReplyModal";

import { FaHeart, FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";

const PostActions = ({ post, queryType }) => {
  const currentUser = useCurrentUser();

  const replyModal = useModal();

  const keysToOmit = [
    "userLikes",
    "userShared",
    "userReplies",
    "tags",
    "views",
  ];
  const simplifiedPost = omit(post, keysToOmit);

  const isLiked = post.userLikes.includes(currentUser.data._id);
  const isShared = post.userShared.includes(currentUser.data._id);

  // TODO: update lại cho Post page
  const likeMutation = useLikePost(queryType, post._id);
  const shareMutation = useSharePost(queryType, post._id);

  const handleReply = (event) => {
    event.preventDefault();
    replyModal.openModal();
  };

  const handleLikePost = (event) => {
    event.preventDefault();
    likeMutation.mutate({ postId: post._id, notificationType: "like" });
  };

  const handleSharePost = (event) => {
    event.preventDefault();
    shareMutation.mutate({ postId: post._id, notificationType: "share" });
  };
  return (
    <div className="flex justify-between mt-3">
      <div className="flex gap-4 items-center w-2/3 justify-between">
        <div
          className="flex gap-1 items-center cursor-pointer group"
          onClick={handleReply}
        >
          <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
          <span className="text-sm text-slate-500 group-hover:text-sky-400">
            {post.userReplies || 0}
          </span>
        </div>
        {replyModal.open && (
          <ReplyModal
            modal={replyModal}
            post={simplifiedPost}
            queryType={queryType}
          />
        )}
        <div
          className="flex gap-1 items-center group cursor-pointer"
          onClick={handleSharePost}
        >
          <BiRepost
            className={twMerge(
              "w-6 h-6  text-slate-500 group-hover:text-green-500",
              isShared ? "text-green-500" : ""
            )}
          />
          <span className="text-sm text-slate-500 group-hover:text-green-500">
            {post.userShared.length || 0}
          </span>
        </div>
        <div
          className="flex gap-1 items-center group cursor-pointer"
          onClick={handleLikePost}
        >
          {!isLiked && (
            <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
          )}
          {isLiked && (
            <FaHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
          )}

          <span
            className={`text-sm  group-hover:text-pink-500 ${
              isLiked ? "text-pink-500" : "text-slate-500"
            }`}
          >
            {post.userLikes.length || 0}
          </span>
        </div>
      </div>
      <div className="flex w-1/3 justify-end gap-2 items-center">
        <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default PostActions;
