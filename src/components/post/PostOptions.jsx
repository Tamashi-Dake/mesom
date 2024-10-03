import { FaTrash } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useDeletePost } from "../../hooks/usePost";
import { IoIosMore } from "react-icons/io";
import { useParams } from "react-router-dom";

const PostOptions = ({ authorId, postId, queryType }) => {
  const currentUser = useCurrentUser();
  const { postId: postParam } = useParams();

  const isMyPost = currentUser.data._id === authorId;
  const deleteMutation = useDeletePost(queryType, postParam);

  const handlePostActionModal = (event) => {
    event.preventDefault();

    // TODO: Open Owner/Post Action Modal
    console.log("click more");
  };

  const handleDeletePost = (event) => {
    event.preventDefault();
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
