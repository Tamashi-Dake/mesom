import { Link } from "react-router-dom";

const AuthorAvatar = ({ author, isReply = false }) => {
  return (
    <div className="flex flex-col self-stretch items-center gap-4 ">
      <Link
        to={`/profile/${author.username}`}
        className="w-8 h-8 rounded-full overflow-hidden block"
      >
        <img src={author.profile.avatarImg || "https://placehold.co/400x400"} />
      </Link>
      {isReply && (
        <div className="reply-line-wrapper flex flex-1 justify-center">
          <div className="reply-line border-[1px] border-neutral-400 "></div>
        </div>
      )}
    </div>
  );
};

export default AuthorAvatar;
