import { useState } from "react";
import HomeHeader from "../components/layout/HomeHeader";
import useFetchData from "../../hooks/useFetchData";

const Home = () => {
  const [feedType, setFeedType] = useState("forYou");

  const { data, isLoading, isError, error } = useFetchData(
    {
      url: feedType === "forYou" ? "/posts" : "/posts/following",
    },
    {
      onSuccess: (response) => {
        console.log("Fetched successfully:", response);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    }
  );

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
