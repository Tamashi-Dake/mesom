import PropTypes from "prop-types";
import BackButton from "../shared/BackButton";

const SearchHeader = ({
  searchValue,
  onSearchValueChange,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex  justify-between py-2 flex-col">
      <form className="px-4 py-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Search"
            required
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
          />
          {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">X</button> */}
        </div>
      </form>

      <div className="border-b-[1px] px-4 flex">
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
    </div>
  );
};

SearchHeader.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchValueChange: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default SearchHeader;
