import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/profile/${user.username}`}
      className="flex items-center justify-between gap-4"
    >
      <div className="flex gap-2 items-center">
        <div className="avatar w-8 h-8 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={user.profile?.avatar || "/placeholder.png"}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight truncate w-28">
            {user.displayName || user.username}
          </span>
          <span className="text-sm text-slate-500">@{user.username}</span>
        </div>
      </div>

      <FollowButton userId={user._id} />
    </Link>
  );
};

export default UserCard;
