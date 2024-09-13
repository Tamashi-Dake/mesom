import { useState } from "react";
import HomeHeader from "../components/layout/HomeHeader";
import { useQuery } from "@tanstack/react-query";
import { getFollowingPosts, getPosts } from "../services/postsService";

const Home = () => {
  const [feedType, setFeedType] = useState("forYou");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", feedType],
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
            <div>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              {/* {data?.map((post) => (
              <div key={post.id}>
                <h2>{post.text}</h2>
                <p>{post.views}</p>
              </div>
            ))} */}
            </div>
          </>
        )}
        {feedType === "following" && (
          <>
            <div>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              {/* {data?.map((post) => (
              <div key={post.id}>
                <h2>{post.text}</h2>
                <p>{post.views}</p>
              </div>
            ))} */}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
