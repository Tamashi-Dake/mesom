import PropTypes from "prop-types";

const HomeHeader = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b-[1px] flex">
      <div
        className={
          "flex justify-center flex-1 p-3 hover:bg-neutral-300 transition-all ease-in-out duration-300 cursor-pointer relative"
        }
        onClick={() => onTabChange("forYou")}
      >
        For you
        <div
          className={` transition-all ease-in-out duration-300 ${
            activeTab === "forYou"
              ? "absolute bottom-0 w-10 h-1 rounded-full bg-blue-500"
              : ""
          }`}
        ></div>
      </div>
      <div
        className="flex justify-center flex-1 p-3 hover:bg-neutral-300 transition duration-300 cursor-pointer relative"
        onClick={() => onTabChange("following")}
      >
        Following
        <div
          className={` transition-all ease-in-out duration-300 ${
            activeTab === "following"
              ? "absolute bottom-0 w-10 h-1 rounded-full bg-blue-500"
              : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

HomeHeader.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default HomeHeader;
