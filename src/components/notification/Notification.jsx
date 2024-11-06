import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaRetweet, FaReply } from "react-icons/fa";

const NotificationIcon = ({ type }) => {
  switch (type) {
    case "follow":
      return <FaUser className="w-7 h-7 text-sky-500" />;
    case "like":
      return <FaHeart className="w-7 h-7 text-red-500" />;
    case "share":
      return <FaRetweet className="w-7 h-7 text-green-500" />;
    case "reply":
      return <FaReply className="w-7 h-7 text-blue-500" />;
    default:
      return null;
  }
};

const Notification = ({ notification }) => {
  const link =
    notification?.type === "follow"
      ? `/profile/${notification.from.username}`
      : `/post/${notification.post}`;

  return (
    <div className="border-b border-gray-200" key={notification?._id}>
      <div className="flex gap-2 p-4">
        <NotificationIcon type={notification?.type} />
        <Link className="flex-1" to={link}>
          <div className="avatar w-8 h-8">
            <img
              src={
                notification?.from.profile.avatarImg ||
                "https://placehold.co/200x200"
              }
              className="rounded-full object-cover h-full w-full"
            />
          </div>
          <div className="flex gap-1">
            <span className="font-bold">@{notification?.from.username}</span>{" "}
            {notification?.type === "reply" && "replied to your post"}
            {notification?.type === "follow" && "started following you"}
            {notification?.type === "like" && "liked your post"}
            {notification?.type === "share" && "shared your post"}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Notification;
