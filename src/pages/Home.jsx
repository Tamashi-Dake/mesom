import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getFollowingPosts, getPosts } from "../services/postsService";

import HomeHeader from "../components/layout/HomeHeader";
import CreatePost from "../components/post/CreatePost";
import Post from "../components/post/Post";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Home = () => {
  const [queryType, setFeedType] = useState("forYou");

  const {
    data,
    error,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", queryType],
    queryFn: ({ pageParam = 0 }) => {
      if (queryType === "forYou") {
        return getPosts({ skip: pageParam });
      }
      if (queryType === "following") {
        return getFollowingPosts({ skip: pageParam });
      }
    },
    getNextPageParam: (lastPage) => {
      console.log(lastPage.nextSkip);
      return lastPage.nextSkip || undefined;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleTabChange = (tab) => {
    setFeedType(tab);
  };

  return (
    <>
      <HomeHeader activeTab={queryType} onTabChange={handleTabChange} />
      <CreatePost queryType={queryType} refetch />
      <main>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
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
