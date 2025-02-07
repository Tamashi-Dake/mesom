import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { twMerge } from "tailwind-merge";
import { formatDate } from "../../helper/formatDate";

const Conversation = ({ conversation, innerRef }) => {
  const currentUser = useCurrentUser();
  return (
    <Link
      ref={innerRef}
      to={`/conversation/${conversation._id}`}
      className="grid grid-cols-[auto,1fr] items-center justify-between px-4 py-2"
    >
      <div className="avatar relative flex h-12 w-12 rounded-full">
        {conversation.isGroup ? (
          // if conversation is group, show group image || first 3 participants' avatar
          conversation.avatar ? (
            <img
              className="h-full w-full object-cover"
              src={conversation.avatar || "/placeholder.png"}
            />
          ) : (
            conversation.participants
              .slice(0, 3)
              .map((participant, index) => (
                <img
                  key={participant._id}
                  className={twMerge(
                    "absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover",
                    index === 0 && "-translate-x-1 -translate-y-2",
                    index === 1 && "-translate-y-6",
                    index === 2 && "-translate-x-6 -translate-y-2",
                  )}
                  src={participant.profile?.avatarImg || "/placeholder.png"}
                />
              ))
          )
        ) : (
          <img
            className="h-full w-full object-cover"
            src={
              conversation.participants.find(
                (participant) => participant._id !== currentUser._id,
              ).profile?.avatarImg || "/placeholder.png"
            }
          />
        )}
      </div>
      <div className="flex items-center justify-between p-2">
        <div className="flex flex-col">
          <span className="truncate font-semibold tracking-tight hover:underline">
            {conversation.isGroup
              ? conversation.name
              : conversation.participants.find(
                  (participant) => participant._id !== currentUser._id,
                ).displayName ||
                conversation.participants.find(
                  (participant) => participant._id !== currentUser._id,
                ).username}
          </span>
          <span className="truncate text-sm text-main-secondary">
            {conversation.lastMessage
              ? conversation.lastMessage.type !== "text"
                ? " sends a file"
                : conversation.lastMessage.text
              : "No messages yet"}
          </span>
          <span>
            {conversation.lastMessage &&
              formatDate(conversation.lastMessage.createdAt)}
          </span>
        </div>
        {/* TODO: Conversation options */}
      </div>
    </Link>
  );
};

export default Conversation;
