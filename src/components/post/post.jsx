import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import useCurrentUser from "../../hooks/useCurrentUser";
import { useLikePost, useSharePost } from "../../hooks/usePost";
import { deletePost } from "../../services/postsService";

import { formatPostDate } from "../../helper/formatDate";
import { gridImages } from "../shared/config";

import { FaHeart, FaRegComment, FaTrash } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { usePostModal as useReplyModal } from "../../hooks/useModal";
import ReplyModal from "../modal/ReplyModal";
// import LoadingSpinner from "./LoadingSpinner";

const Post = ({ post, postType }) => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  // Modal
  const replyModal = useReplyModal();

  const isLiked = post.userLikes.includes(currentUser.data._id);
  const isShared = post.userShared.includes(currentUser.data._id);

  const isMyPost = currentUser.data._id === post.author._id;

  const formattedDate = formatPostDate(post.createdAt);

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts", postType],
      });
    },
  });

  const likeMutation = useLikePost(postType, post._id);
  const shareMutation = useSharePost(postType, post._id);

  const handlePostActionModal = () => [
    // TODO: Open Owner/Post Action Modal
    console.log("click more"),
  ];

  const handleDeletePost = () => {
    deleteMutation.mutate(post._id);
  };

  const handleLikePost = (event) => {
    event.preventDefault();
    likeMutation.mutate({ postId: post._id, notificationType: "like" });
  };

  const handleSharePost = (event) => {
    event.preventDefault();
    shareMutation.mutate({ postId: post._id, notificationType: "share" });
  };

  console.log("rerender");

  return (
    <div className="flex gap-2 items-start p-4 border-b border-gray-200">
      <div className="avatar ">
        <Link
          to={`/profile/${post.author.username}`}
          className="w-8 h-8 rounded-full overflow-hidden block"
        >
          <img
            src={post.author.profile.avatar || "https://placehold.co/400x400"}
          />
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${post.author.username}`} className="font-bold">
              {post.author.displayName || post.author.username}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${post.author.username}`}>
                @{post.author.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
          </div>
          <span className="flex gap-2">
            {isMyPost && (
              <FaTrash
                className={twMerge(
                  "cursor-pointer hover:text-red-500",
                  deleteMutation.isPending
                    ? "text-gray-500 cursor-not-allowed"
                    : ""
                )}
                onClick={handleDeletePost}
              />
            )}
            <IoIosMore
              className="cursor-pointer hover:text-neutral-400"
              onClick={handlePostActionModal}
            />
          </span>
        </div>
        <div className="flex flex-col gap-3 overflow-hidden">
          <span>{post.text}</span>
          {post.images?.length > 0 && (
            <div
              className={`grid gap-[2px] rounded-lg overflow-hidden ${
                gridImages[post.images.length - 1]
              }`}
            >
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={twMerge(
                    "h-full w-full object-cover ",
                    post.images.length === 3 && index === 0 ? "row-span-2" : ""
                  )}
                  // "h-80 object-contain rounded-lg border border-gray-700"
                  alt={`Image ${index}`} // Tạo alt dynamic
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex gap-4 items-center w-2/3 justify-between">
            <div
              className="flex gap-1 items-center cursor-pointer group"
              onClick={replyModal.openModal}
            >
              <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
              <span className="text-sm text-slate-500 group-hover:text-sky-400">
                {post.userReplies || 0}
              </span>
            </div>
            {replyModal.open && <ReplyModal modal={replyModal} post={post} />}
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
      </div>
    </div>
  );
};
export default Post;
