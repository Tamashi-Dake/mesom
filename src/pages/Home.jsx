import { useState } from "react";
import HomeHeader from "../components/layout/HomeHeader";

const Home = () => {
  const [feedType, setFeedType] = useState("forYou");

  const handleTabChange = (tab) => {
    setFeedType(tab);
  };
  return (
    <>
      <HomeHeader activeTab={feedType} onTabChange={handleTabChange} />
      <main>
        {feedType === "forYou" && <div>Content forYou</div>}
        {feedType === "following" && <div>Content following</div>}
      </main>
    </>
  );
};

export default Home;
