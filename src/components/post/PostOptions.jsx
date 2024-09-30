import { FaTrash } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useDeletePost } from "../../hooks/usePost";
import { IoIosMore } from "react-icons/io";

const PostOptions = ({ authorId, postId, queryType }) => {
  const currentUser = useCurrentUser();

  const isMyPost = currentUser.data._id === authorId;
  const deleteMutation = useDeletePost(queryType);

  const handlePostActionModal = () => [
    // TODO: Open Owner/Post Action Modal
    console.log("click more"),
  ];

  const handleDeletePost = () => {
    deleteMutation.mutate(postId);
  };

  return (
    <span className="flex gap-2">
      {isMyPost && (
        <FaTrash
          className={twMerge(
            "cursor-pointer hover:text-red-500",
            deleteMutation.isPending ? "text-gray-500 cursor-not-allowed" : ""
          )}
          onClick={handleDeletePost}
        />
      )}
      <IoIosMore
        className="cursor-pointer hover:text-neutral-400"
        onClick={handlePostActionModal}
      />
    </span>
  );
};

export default PostOptions;
