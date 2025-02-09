import { SEO } from "../common/SEO";
import useStore from "../../hooks/useStore";
import useCurrentUser from "../../hooks/useCurrentUser";
import DefaultHeader from "../layout/DefaultHeader";
import MessageInput from "./MessageInput";

const NewConversation = () => {
  const currentUser = useCurrentUser();
  //   const participants = useStore((state) => state.data);
  const participants = [
    { _id: "1", name: "user1" },
    { _id: "2", name: "user2" },
    { _id: "3", name: "user3" },
    { _id: "4", name: "user4" },
  ];
  const conversationName = participants
    .slice(0, 3)
    .map((member) => member.name)
    .join();
  return (
    <>
      <SEO title={"New Conversation / Mesom"} />
      <div className="flex h-[100vh] flex-col overflow-auto xs:h-full">
        <DefaultHeader label={conversationName} showBackArrow />
        <div className="flex-1 space-y-4 overflow-y-auto p-4"></div>
        <MessageInput />
      </div>
    </>
  );
};

export default NewConversation;
