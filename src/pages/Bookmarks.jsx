import { useQuery } from "@tanstack/react-query";

import { getUserBookmarks } from "../services/postsService";
import { useModal } from "../hooks/useModal";

import Post from "../components/post/Post";
import BookmarkHeader from "../components/layout/BookmarkHeader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Modal } from "../components/modal/Modal";
import { ActionModal } from "../components/modal/ActionModal";
import toast from "react-hot-toast";

const Bookmark = () => {
  const deleteAllBookmarkModal = useModal();

  const bookmarkQuery = useQuery({
    queryKey: ["posts", "bookmarks"],
    queryFn: () => {
      return getUserBookmarks();
    },
  });

  const handleClear = () => {
    // TODO: Delete all bookmark + only allow Premium user
    deleteAllBookmarkModal.closeModal();
    toast.success("Successfully cleared all bookmarks");
  };

  return (
    <>
      <BookmarkHeader modal={deleteAllBookmarkModal} />
      <main>
        {bookmarkQuery.isLoading && <LoadingSpinner />}
        {bookmarkQuery.isError && (
          <div>Error: {bookmarkQuery.error.message}</div>
        )}
        {bookmarkQuery.data?.posts.length === 0 && (
          <section className="mt-0.5 flex justify-center p-8">
            <div className="max-w-sm flex flex-col items-center gap-6">
              <span className="overflow-hidden relative w-full h-52">
                <img
                  alt="No bookmarks"
                  src="/no-bookmarks.png"
                  className="object-cover absolute inset-0 p-0 m-auto "
                />
              </span>
              <div className="flex flex-col gap-2 text-center">
                <p className="text-3xl font-extrabold">Save Posts for later</p>
                <p className="text-light-secondary dark:text-dark-secondary">
                  Don’t let the good ones fly away! Bookmark Posts to easily
                  find them again in the future.
                </p>
              </div>
            </div>
          </section>
        )}
        {bookmarkQuery.data?.posts.map((post) => (
          <Post key={post._id} post={post} queryType={"bookmarks"} />
        ))}
      </main>
      <Modal
        modalClassName="max-w-xs relative bg-main-background bg-white w-full p-8 rounded-2xl"
        open={deleteAllBookmarkModal.open}
        closeModal={deleteAllBookmarkModal.closeModal}
        actionModal
      >
        <ActionModal
          useIcon
          title="Clear all Bookmarks?"
          description="This can’t be undone and you’ll remove all Tweets you’ve added to your Bookmarks."
          mainBtnClassName="bg-accent-red bg-red-500 hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab focus-visible:bg-accent-red/90"
          mainBtnLabel="Clear"
          action={handleClear}
          closeModal={deleteAllBookmarkModal.closeModal}
        />
      </Modal>
    </>
  );
};

export default Bookmark;
