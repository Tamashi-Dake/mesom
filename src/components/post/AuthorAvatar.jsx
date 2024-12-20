import { Link } from "react-router-dom";
import UserTooltip from "../shared/UserTooltip";

const AuthorAvatar = ({ author, isReply = false, inModal }) => {
  return (
    <div className="flex flex-col items-center gap-4 self-stretch">
      <Link to={`/profile/${author?.username}`}>
        <UserTooltip user={author} inPost inModal={inModal}>
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover"
              src={author?.profile?.avatarImg || "/placeholder.png"}
            />
          </div>
        </UserTooltip>
      </Link>
      {isReply && (
        <div className="reply-line-wrapper flex flex-1 justify-center">
          <div className="reply-line border-[1px] border-neutral-400"></div>
        </div>
      )}
    </div>
  );
};

export default AuthorAvatar;
