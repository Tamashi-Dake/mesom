import { redirect, useParams } from "react-router-dom";
import { SEO } from "../common/SEO";
import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../services/conversationService";
import ConversationPageHeader from "../layout/ConversationPageHeader";
import MessageInput from "./MessageInput";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { getMessages } from "../../services/messageService";
import Message from "./Message";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

const Conversation = () => {
  const { conversationId } = useParams();

  const { data: conversation } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversation(conversationId),
  });

  const {
    data: messages,
    error,
    isLoading,
    isError,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll(
    ["conversation", conversationId, "messages"],
    ({ pageParam = 0 }) =>
      getMessages({ conversationId: conversationId, skip: pageParam }),
    (lastPage) => lastPage.nextSkip || undefined,
  );

  return (
    <>
      <SEO title={conversation?.name || "Message / Mesom"} />
      <div className="flex h-[100vh] flex-col overflow-auto">
        <ConversationPageHeader
          name={conversation?.name}
          onClick={() => redirect(`/conversation/${conversation?._id}/info`)}
        />
        {/* TODO: Load from Last message location, scroll up for more */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
          {isLoading || (isFetchingNextPage && <LoadingSpinner />)}
          {isError && toast.error(error.message)}
          {messages?.pages?.map((searchPageInfo) =>
            [...searchPageInfo.messages].map(
              (message, index, reversedMessages) => {
                const isMessageBeforeLastMessage =
                  index === reversedMessages.length - 1;
                return (
                  <Message
                    innerRef={isMessageBeforeLastMessage ? ref : null}
                    key={message._id}
                    message={message}
                  />
                );
              },
            ),
          )}
          {messages?.pages[0]?.message && (
            <div className="text-center text-main-primary">
              {messages?.pages[0]?.message}
            </div>
          )}

          {/* <Message />
          <Message isMe /> */}
        </div>
        <MessageInput />
      </div>
    </>
  );
};

export default Conversation;
