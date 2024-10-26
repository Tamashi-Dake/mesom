import useCurrentUser from "../../hooks/useCurrentUser";
import { useFollowUser } from "../../hooks/useUser";

const FollowButton = ({ userId, refetchSingle }) => {
  const currentUser = useCurrentUser();
  const followUserMutation = useFollowUser(userId, refetchSingle);

  const isFollowing = currentUser.data.following.includes(userId);

  const handleFollow = () => {
    followUserMutation.mutate({ userId: userId, notificationType: "follow" });
  };
  return (
    <button
      className="btn bg-black text-white hover:bg-neutral-700 hover:opacity-90 rounded-full btn-sm"
      onClick={(e) => {
        e.preventDefault();
        handleFollow();
      }}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
