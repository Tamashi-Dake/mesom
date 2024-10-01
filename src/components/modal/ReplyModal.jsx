import { AiOutlineClose } from "react-icons/ai";
import CreatePost from "../post/CreatePost";
import { Modal } from "./Modal";
import AuthorAvatar from "../post/AuthorAvatar";
import PostInfo from "../post/PostInfo";
import PostContent from "../post/PostContent";
import { formatPostDate } from "../../helper/formatDate";
import { Link } from "react-router-dom";

const ReplyModal = ({ modal, post }) => {
  const date = formatPostDate(post.createdAt);

  return (
    <Modal
      className="flex items-start justify-center "
      modalClassName="bg-white relative rounded-2xl max-w-xl w-full my-8 overflow-hidden"
      open={modal.open}
      closeModal={modal.closeModal}
    >
      <button
        className="absolute right-0 top-0 p-4 ml-auto border-0 text-neutral-800 hover:opacity-70 transition"
        onClick={modal.closeModal}
      >
        <AiOutlineClose size={20} />
      </button>
      <div className="flex gap-2 items-start p-4 ">
        <AuthorAvatar author={post.author} isReply />
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-start">
            <PostInfo author={post.author} date={date} />
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
      </div>
      <CreatePost queryType={"forYou"} isReply={true} />
      {/* <TweetReplyModal tweet={tweet} closeModal={closeModal} /> */}
    </Modal>
  );
};

export default ReplyModal;
