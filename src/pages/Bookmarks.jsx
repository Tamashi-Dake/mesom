import { getUserBookmarks } from "../services/postsService";
import { useModal } from "../hooks/useModal";

import Post from "../components/post/Post";
import BookmarkHeader from "../components/layout/BookmarkHeader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Modal } from "../components/modal/Modal";
import { ActionModal } from "../components/modal/ActionModal";
import toast from "react-hot-toast";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { SEO } from "../components/common/SEO";

const Bookmark = () => {
  const deleteAllBookmarkModal = useModal();

  const { data, error, isError, isLoading, isFetchingNextPage, ref } =
    useInfiniteScroll(
      ["posts", "bookmarks"],
      ({ pageParam = 0 }) => {
        return getUserBookmarks({ skip: pageParam });
      },
      (lastPage) => lastPage.nextSkip || undefined,
    );

  const handleClear = () => {
    // TODO: Delete all bookmark + only allow Premium user
    deleteAllBookmarkModal.closeModal();
    toast.success("Successfully cleared all bookmarks");
  };

  return (
    <>
      <SEO title="Bookmarks / Mesom" />
      <BookmarkHeader modal={deleteAllBookmarkModal} />
      <main>
        {isLoading && <LoadingSpinner />}
        {isError && <div>Error: {error.message}</div>}
        {data?.pages[0]?.message ? (
          <section className="mt-0.5 flex justify-center p-8">
            <div className="flex max-w-sm flex-col items-center gap-6">
              <span className="relative h-52 w-full overflow-hidden">
                <img
                  alt="No bookmarks"
                  src="/no-bookmarks.png"
                  className="absolute inset-0 m-auto object-cover p-0"
                />
              </span>
              <div className="flex flex-col gap-2 text-center">
                <p className="text-3xl font-extrabold text-main-primary">
                  Save Posts for later
                </p>
                <p className="text-main-secondary">
                  Don’t let the good ones fly away! Bookmark Posts to easily
                  find them again in the future.
                </p>
              </div>
            </div>
          </section>
        ) : (
          data?.pages.map((bookmarkPageInfo) =>
            bookmarkPageInfo.posts.map((post, index) => {
              const isPostBeforeLastPost =
                index === bookmarkPageInfo.posts.length - 1;
              return (
                <Post
                  innerRef={isPostBeforeLastPost ? ref : null}
                  key={post._id}
                  post={post}
                  queryType={"bookmarks"}
                />
              );
            }),
          )
        )}
        {isFetchingNextPage && <LoadingSpinner />}
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
