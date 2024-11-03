import TextArea from "react-textarea-autosize";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import useCurrentUser from "../../hooks/useCurrentUser";
import { useCreatePost } from "../../hooks/usePost";

import CreatePostActions from "./CreatPostActions";
import ImageView from "../shared/ImageView";

const CreatePost = ({
  postId,
  isReply,
  refetch,
  queryType,
  onPost,
  modal = false,
}) => {
  const currentUser = useCurrentUser();
  const { postId: postParam } = useParams();

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

  // TODO: cần check khi reply trong Post page
  useEffect(() => {
    if (isReply) {
      !postId && toast.error("Missing parent post");
      if (postMutate.isSuccess && onPost) {
        onPost();
      }
    }
  }, [isReply, postId, postMutate.isSuccess]);

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-200">
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
          <ImageView
            images={previewImages}
            imagesCount={previewImages.length}
            previewImage
            removeImage={handleRemoveImage}
          />
        )}

        <CreatePostActions
          verifiedUser={currentUser.data?.verified}
          handleAddEmoji={setText}
          textLength={text.length}
          imagesLength={images.length}
          imgRef={imgRef}
          handleImgChange={handleImgChange}
          mutatePening={postMutate.isPending}
          modal={modal}
        />

        {postMutate.isError && toast.error(postMutate.error.message)}
      </form>
    </div>
  );
};
export default CreatePost;
