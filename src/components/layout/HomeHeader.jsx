import Tab from "../common/Tab";
import HeaderWrapper from "./HeaderWrapper";

const HomeHeader = ({ activeTab, onTabChange }) => {
  return (
    <HeaderWrapper classname={"p-0 pt-2 flex"}>
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
    </HeaderWrapper>
  );
};

export default HomeHeader;
