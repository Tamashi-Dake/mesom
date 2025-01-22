import { useState } from "react";
import { getFollowingPosts, getPosts } from "../services/postsService";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import HomeHeader from "../components/layout/HomeHeader";
import CreatePost from "../components/post/CreatePost";
import Post from "../components/post/Post";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { SEO } from "../components/common/SEO";
import { useMediaQuery } from "usehooks-ts";

const Home = () => {
  const [queryType, setFeedType] = useState("forYou");
  const isMobile = useMediaQuery("(max-width: 500px)");

  const { data, error, isError, isLoading, isFetchingNextPage, ref } =
    useInfiniteScroll(
      ["posts", queryType],
      ({ pageParam = 0 }) => {
        if (queryType === "forYou") {
          return getPosts({ skip: pageParam });
        }
        if (queryType === "following") {
          return getFollowingPosts({ skip: pageParam });
        }
      },
      (lastPage) => lastPage.nextSkip || undefined,
    );

  const handleTabChange = (tab) => {
    setFeedType(tab);
  };

  if (isLoading) return <LoadingSpinner />;
  // TODO: catch error
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <SEO
        title="Home / Mesom"
        description="This is Mesom, where you join discussions about the latest news."
      />
      <HomeHeader activeTab={queryType} onTabChange={handleTabChange} />
      {!isMobile && <CreatePost queryType={queryType} refetch />}
      <main>
        {data?.pages[0]?.message ? (
          <section className="mt-0.5 flex justify-center p-8">
            <div className="flex max-w-sm flex-col items-center gap-6">
              <div className="flex flex-col gap-2 text-center">
                <p className="text-3xl font-extrabold text-main-primary">
                  Welcome to Mesom!
                </p>
                <p className="text-main-secondary">
                  When you follow someone, their posts will show up here. Find
                  some people to follow now.
                </p>
              </div>
            </div>
          </section>
        ) : (
          data?.pages.map((postPageInfo) =>
            postPageInfo.posts.map((post, index) => {
              const isPostBeforeLastPost =
                index === postPageInfo.posts.length - 1;
              return (
                <Post
                  innerRef={isPostBeforeLastPost ? ref : null}
                  key={post._id}
                  post={post}
                  queryType={queryType}
                />
              );
            }),
          )
        )}
        {isFetchingNextPage && <LoadingSpinner />}
      </main>
    </>
  );
};

export default Home;
