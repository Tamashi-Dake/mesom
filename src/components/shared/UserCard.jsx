import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import UserTooltip from "./UserTooltip";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/profile/${user.username}`}
      className="grid max-w-[260px] grid-cols-[auto,1fr] items-center justify-between"
    >
      <UserTooltip user={user}>
        <div className="avatar h-12 w-12 overflow-hidden rounded-full">
          <img
            className="h-full w-full object-cover"
            src={user.profile?.avatarImg || "/placeholder.png"}
          />
        </div>
      </UserTooltip>
      <div className="flex items-center justify-between p-2">
        <UserTooltip user={user}>
          <div className="flex flex-col">
            <span className="w-28 truncate font-semibold tracking-tight hover:underline">
              {user.displayName || user.username}
            </span>
            <span className="w-28 truncate text-sm text-slate-500">
              @{user.username}
            </span>
          </div>
        </UserTooltip>
        <FollowButton userId={user._id} />
      </div>
    </Link>
  );
};

export default UserCard;
