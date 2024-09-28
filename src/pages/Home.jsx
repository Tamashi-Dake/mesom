import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFollowingPosts, getPosts } from "../services/postsService";

import HomeHeader from "../components/layout/HomeHeader";
import CreatePost from "../components/post/CreatePost";
import Post from "../components/post/Post";

const Home = () => {
  const [feedType, setFeedType] = useState("forYou");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "posts",
      // TODO: Consider adding feedType to refetch independently
      feedType,
    ],
    queryFn: () => {
      if (feedType === "forYou") {
        return getPosts();
      }
      if (feedType === "following") {
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
      <HomeHeader activeTab={feedType} onTabChange={handleTabChange} />
      <CreatePost postType={feedType} />
      <main>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        {feedType === "forYou" && (
          <>
            {data?.posts?.map((post) => (
              <Post key={post._id} post={post} postType={feedType} />
            ))}
            {/* {console.log(data.posts)} */}
          </>
        )}
        {feedType === "following" && (
          <>
            <div>
              {data?.posts?.map((post) => (
                <Post key={post._id} post={post} postType={feedType} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
