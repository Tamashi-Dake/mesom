import { BiCog } from "react-icons/bi";
import Tab from "../common/Tab";
import HeaderWrapper from "./HeaderWrapper";

const NotificationHeader = ({ activeTab, onTabChange }) => {
  return (
    <HeaderWrapper classname={"flex justify-between flex-col p-0"}>
      <div className="p-4 pb-2 flex justify-between">
        <h1 className=" text-xl leading-none font-semibold ">Notifications</h1>
        <button
          onClick={() => alert("open menu: Setting, delete all(premium)")}
        >
          <BiCog />
        </button>
      </div>

      <div className="border-b-[1px] flex">
        <Tab
          label="All"
          isActive={activeTab === "allNotifications"}
          onClick={() => onTabChange("allNotifications")}
        />
        <Tab
          label="Mentions"
          isActive={activeTab === "mentions"}
          onClick={() => onTabChange("mentions")}
        />
      </div>
    </HeaderWrapper>
  );
};

export default NotificationHeader;
