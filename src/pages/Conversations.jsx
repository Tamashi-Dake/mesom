import { useEffect, useState } from "react";

import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { searchConversations } from "../services/searchService";

import { SEO } from "../components/common/SEO";
import ConversationsHeader from "../components/layout/ConversationsHeader";
import SearchInput from "../components/shared/SearchInput";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ConversationCard from "../components/conversation/ConversationCard";

const Conversations = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { data, error, isError, isLoading, isFetchingNextPage, ref } =
    useInfiniteScroll(
      ["search", "conversations", searchValue],
      ({ pageParam = 0 }) => {
        return searchConversations({ query: searchValue, skip: pageParam });
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
  return (
    <>
      <SEO title="Conversations / Mesom" />
      <ConversationsHeader
        onClick={() => alert("Open Conversation settings - WIP")}
      />
      <main>
        <div className="px-4 pb-2">
          <SearchInput
            label="Search conversations"
            placeholder="Search conversation name"
            value={inputValue}
            onChange={onInputValueChange}
            className={"rounded-full"}
          />
        </div>
        <div>
          {isLoading && <LoadingSpinner />}
          {data?.pages?.map((searchPageInfo) =>
            searchPageInfo?.conversations?.map((con, index) => {
              const isConversationBeforeLastConversation =
                index === searchPageInfo.conversations.length - 1;
              return (
                <ConversationCard
                  innerRef={isConversationBeforeLastConversation ? ref : null}
                  key={con._id}
                  conversation={con}
                />
              );
            }),
          )}
          {isFetchingNextPage && <LoadingSpinner />}
          {isError && <div>Error: {error.message}</div>}
        </div>
      </main>
    </>
  );
};

export default Conversations;
