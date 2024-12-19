import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/profile/${user.username}`}
      className="grid grid-cols-[auto,1fr] items-center justify-between gap-2"
    >
      <div className="avatar h-12 w-12 overflow-hidden rounded-full">
        <img
          className="h-full w-full object-cover"
          src={user.profile?.avatar || "/placeholder.png"}
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex flex-col">
          <span className="w-28 truncate font-semibold tracking-tight">
            {user.displayName || user.username}
          </span>
          <span className="w-28 truncate text-sm text-slate-500">
            @{user.username}
          </span>
        </div>
        <FollowButton userId={user._id} />
      </div>
    </Link>
  );
};

export default UserCard;
