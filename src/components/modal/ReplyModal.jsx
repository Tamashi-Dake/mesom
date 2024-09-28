import { AiOutlineClose } from "react-icons/ai";
import CreatePost from "../post/CreatePost";
import { Modal } from "./Modal";

const ReplyModal = ({ modal, post }) => {
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
      <pre>{JSON.stringify(post.text, null, 2)}</pre>
      <CreatePost postType={"forYou"} isReply={true} />
      {/* <TweetReplyModal tweet={tweet} closeModal={closeModal} /> */}
    </Modal>
  );
};

export default ReplyModal;
