import { BiCog } from "react-icons/bi";
import Tab from "../common/Tab";

const NotificationHeader = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-between py-2 flex-col sticky top-0 bg-white">
      <div className="px-4 py-2 flex justify-between">
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
    </div>
  );
};

export default NotificationHeader;
