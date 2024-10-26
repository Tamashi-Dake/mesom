import Tab from "../common/Tab";

const HomeHeader = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b-[1px] flex sticky top-0 bg-white">
      <Tab
        label="For you"
        isActive={activeTab === "forYou"}
        onClick={() => onTabChange("forYou")}
      />
      <Tab
        label="Following"
        isActive={activeTab === "following"}
        onClick={() => onTabChange("following")}
      />
    </div>
  );
};

export default HomeHeader;
