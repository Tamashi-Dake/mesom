import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useFollowUser } from "../../hooks/useUser";

const UserCard = ({ user }) => {
  const currentUser = useCurrentUser();
  const followUserMutation = useFollowUser(user);

  const isFollowing = currentUser.data.following.includes(user._id);

  const handleFollow = () => {
    followUserMutation.mutate({ userId: user._id, notificationType: "follow" });
  };

  console.log(user.followers);
  return (
    <Link
      to={`/profile/${user.username}`}
      className="flex items-center justify-between gap-4"
    >
      <div className="flex gap-2 items-center">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={user.profile?.avatar || "https://placehold.co/400x400"} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight truncate w-28">
            {user.displayName}
          </span>
          <span className="text-sm text-slate-500">@{user.username}</span>
        </div>
      </div>
      <button
        className="btn bg-black text-white hover:bg-neutral-700 hover:opacity-90 rounded-full btn-sm"
        onClick={(e) => {
          e.preventDefault();
          handleFollow();
        }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </Link>
  );
};

export default UserCard;
