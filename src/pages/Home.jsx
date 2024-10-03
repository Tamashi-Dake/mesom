import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFollowingPosts, getPosts } from "../services/postsService";

import HomeHeader from "../components/layout/HomeHeader";
import CreatePost from "../components/post/CreatePost";
import Post from "../components/post/Post";

const Home = () => {
  const [queryType, setFeedType] = useState("forYou");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", queryType],
    queryFn: () => {
      if (queryType === "forYou") {
        return getPosts();
      }
      if (queryType === "following") {
        return getFollowingPosts();
      }
    },
  });

  // console.log(feedType, data.posts, isLoading, isError, error);
  // console.log(data);
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
        {queryType === "forYou" && (
          <>
            {data?.posts?.map((post) => (
              <Post key={post._id} post={post} queryType={queryType} />
            ))}
          </>
        )}
        {queryType === "following" && (
          <>
            <div>
              {data?.posts?.map((post) => (
                <Post key={post._id} post={post} queryType={queryType} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
