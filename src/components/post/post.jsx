import { FaHeart, FaRegComment, FaTrash } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../helper/formatDate";
import useCurrentUser from "../../hooks/useCurrentUser";
import { IoIosMore } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { deletePost } from "../../services/postsService";

const Post = ({ post, postType }) => {
  // const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const postOwner = post.author;

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

  const handlePostModal = () => [
    // TODO: Open Owner/Post Modal
    console.log("click more"),
  ];

  const handleDeletePost = () => {
    deleteMutation.mutate(post._id);
  };

  console.log("rerender");

  return (
    <div className="flex gap-2 items-start p-4 border-b border-gray-200">
      <div className="avatar ">
        <Link
          to={`/profile/${postOwner.username}`}
          className="w-8 h-8 rounded-full overflow-hidden block"
        >
          <img
            src={postOwner.profile.avatar || "https://placehold.co/400x400"}
          />
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner.username}`} className="font-bold">
              {postOwner.displayName}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
          </div>
          <span className="flex gap-2">
            <FaTrash
              className={twMerge(
                "cursor-pointer hover:text-red-500",
                deleteMutation.isPending
                  ? "text-gray-500 cursor-not-allowed"
                  : ""
              )}
              onClick={handleDeletePost}
            />
            <IoIosMore
              className="cursor-pointer hover:text-neutral-400"
              onClick={handlePostModal}
            />
          </span>
        </div>
        <div className="flex flex-col gap-3 overflow-hidden">
          <span>{post.text}</span>
          {post.images?.length > 0 &&
            post.images.map((image, index) => (
              <img
                key={index} // Đặt key cho mỗi phần tử
                src={image}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt={`Image ${index}`} // Tạo alt dynamic
              />
            ))}
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex gap-4 items-center w-2/3 justify-between">
            <div
              className="flex gap-1 items-center cursor-pointer group"
              // onClick={() =>
              //   document
              //     .getElementById("comments_modal" + post._id)
              //     .showModal()
              // }
            >
              <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
              <span className="text-sm text-slate-500 group-hover:text-sky-400">
                {post.userReplies || 0}
              </span>
            </div>
            {/* <dialog className="modal border-none outline-none">
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-2 items-start">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={
                                comment.user.profileImg ||
                                "/avatar-placeholder.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              {comment.user.fullName}
                            </span>
                            <span className="text-gray-700 text-sm">
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className="text-sm">{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog> */}
            <div className="flex gap-1 items-center group cursor-pointer">
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
              // onClick={handleLikePost}
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
