import Tab from "../common/Tab";

const HomeHeader = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b-[1px] flex sticky top-0 bg-white z-10">
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
