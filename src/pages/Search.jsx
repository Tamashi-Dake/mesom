import { useEffect, useState } from "react";
import SearchHeader from "../components/layout/SearchHeader";
import { SEO } from "../components/common/SEO";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { searchUsers } from "../services/searchService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import UserCard from "../components/shared/UserCard";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  const { data, error, isError, isLoading, isFetchingNextPage, ref } =
    useInfiniteScroll(
      ["search", activeTab, searchValue],
      ({ pageParam = 0 }) => {
        if (!searchValue) {
          return { users: [], nextSkip: null };
        }
        if (activeTab === "users") {
          return searchUsers({ query: searchValue, skip: pageParam });
        }
        if (activeTab === "tags") {
          return { users: [], nextSkip: null };
        }
      },
      (lastPage) => lastPage.nextSkip || undefined,
    );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchValue(inputValue);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const onInputValueChange = (value) => {
    setInputValue(value);
  };
  const onTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <SEO title={"Search / Mesom"} />
      <SearchHeader
        inputValue={inputValue}
        onInputValueChange={onInputValueChange}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <div className="text-main-primary">
        {isLoading && inputValue && <LoadingSpinner />}
        {activeTab === "tags" && (
          <section className="mt-0.5 flex justify-center p-8">
            <div className="flex max-w-sm flex-col items-center gap-6">
              <div className="flex flex-col gap-2 text-center">
                <p className="text-3xl font-extrabold text-main-primary">
                  Search for tags is not available yet
                </p>
                <p className="text-main-secondary">
                  We are working on it, please try searching for users
                </p>
              </div>
            </div>
          </section>
        )}
        {(!inputValue || data?.pages[0]?.message) && activeTab !== "tags" && (
          <section className="mt-0.5 flex justify-center p-8">
            <div className="flex max-w-sm flex-col items-center gap-6">
              <div className="flex flex-col gap-2 text-center">
                <p className="text-3xl font-extrabold text-main-primary">
                  {!inputValue
                    ? "Search for people in Mesom"
                    : data?.pages[0]?.message
                      ? "No results found"
                      : ""}
                </p>
                {data?.pages[0]?.message && (
                  <p className="text-main-secondary">
                    Try searching for something else
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
        {!(!inputValue || data?.pages[0]?.message) &&
          data?.pages?.map((searchPageInfo) =>
            searchPageInfo?.users?.map((user, index) => {
              const isUserBeforeLastUser =
                index === searchPageInfo.users.length - 1;
              return (
                <UserCard
                  originXTranslate
                  openSpace
                  user={user}
                  key={user._id}
                  innerRef={isUserBeforeLastUser ? ref : null}
                />
              );
            }),
          )}
        {isFetchingNextPage && <LoadingSpinner />}
        {isError && <div>Error: {error.message}</div>}
      </div>
    </>
  );
};

export default Search;
