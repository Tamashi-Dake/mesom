import CreatePost from "../post/CreatePost";
import { Modal } from "./Modal";
import AuthorAvatar from "../post/AuthorAvatar";
import PostInfo from "../post/PostInfo";
import PostContent from "../post/PostContent";
import { Link } from "react-router-dom";

const ReplyModal = ({ modal, post }) => {
  return (
    <Modal
      className="flex items-start justify-center "
      modalClassName="bg-white relative rounded-2xl max-w-xl w-full my-8 overflow-hidden"
      open={modal.open}
      closeModal={modal.closeModal}
    >
      <Link
        to={`/post/${post._id}`}
        className="flex gap-2 items-start p-4 hover:bg-neutral-100 transition-all ease-in-out duration-500"
      >
        <AuthorAvatar author={post.author} isReply />
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-start">
            <PostInfo
              author={post.author}
              createDate={post.createdAt}
              postId={post._id}
            />
          </div>
          <PostContent textContent={post.text} images={post.images} />
          <div className="reply-hint flex gap-1 mt-2">
            <span className="text-neutral-500">Replying to</span>
            {/* TODO: Add accent color */}
            <Link
              to={`/profile/${post.author.username}`}
              className="text-blue-500"
            >
              @{post.author.username}
            </Link>
          </div>
        </div>
      </Link>
      {/* TODO: update queryType  */}
      <CreatePost
        queryType={"forYou"}
        isReply={true}
        authorName={post.author.username}
        onPost={modal.closeModal}
        postId={post._id}
        modal
      />
    </Modal>
  );
};

export default ReplyModal;
