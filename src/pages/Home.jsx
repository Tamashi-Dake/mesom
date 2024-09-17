import { useState } from "react";
import HomeHeader from "../components/layout/HomeHeader";
import { useQuery } from "@tanstack/react-query";
import { getFollowingPosts, getPosts } from "../services/postsService";
import Post from "../components/post/post";

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

  const handleTabChange = (tab) => {
    setFeedType(tab);
  };
  return (
    <>
      <HomeHeader activeTab={feedType} onTabChange={handleTabChange} />
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
                <Post key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
