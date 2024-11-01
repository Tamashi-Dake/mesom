import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserCard = ({ user }) => {
  return (
    <Link
      to={`/profile/${user.username}`}
      className="flex items-center justify-between gap-4"
    >
      <div className="flex gap-2 items-center">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={user.profile?.avatar || "/placeholder.png"} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight truncate w-28">
            {user.displayName}
          </span>
          <span className="text-sm text-slate-500">@{user.username}</span>
        </div>
      </div>

      <FollowButton userId={user._id} />
    </Link>
  );
};

export default UserCard;
