import Tab from "../common/Tab";
import MobileSidebar from "./MobileSidebar";
import HeaderWrapper from "./HeaderWrapper";

const SearchHeader = ({
  searchValue,
  onSearchValueChange,
  activeTab,
  onTabChange,
}) => {
  return (
    <HeaderWrapper classname={"flex justify-between p-0 pt-2 flex-col"}>
      <div className="flex items-center gap-2 px-4 py-2">
        <MobileSidebar />
        <form className="flex-1">
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Search"
              required
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
            />
            {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">X</button> */}
          </div>
        </form>
      </div>

      <div className="flex border-b-[1px]">
        <Tab
          label="User"
          isActive={activeTab === "users"}
          onClick={() => onTabChange("users")}
        />
        <Tab
          label="Tag"
          isActive={activeTab === "tags"}
          onClick={() => onTabChange("tags")}
        />
      </div>
    </HeaderWrapper>
  );
};

export default SearchHeader;
