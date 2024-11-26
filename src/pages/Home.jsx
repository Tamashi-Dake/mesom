import { useState } from "react";
import { getFollowingPosts, getPosts } from "../services/postsService";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import HomeHeader from "../components/layout/HomeHeader";
import CreatePost from "../components/post/CreatePost";
import Post from "../components/post/Post";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Home = () => {
  const [queryType, setFeedType] = useState("forYou");

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
      <HomeHeader activeTab={queryType} onTabChange={handleTabChange} />
      <CreatePost queryType={queryType} refetch />
      <main>
        {data?.pages.map((postPageInfo) =>
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
        )}
        {isFetchingNextPage && <LoadingSpinner />}
      </main>
    </>
  );
};

export default Home;
