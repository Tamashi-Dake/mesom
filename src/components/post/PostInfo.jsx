import { Link } from "react-router-dom";
import { formatPostDate } from "../../helper/formatDate";

const PostInfo = ({ author, date }) => {
  const createdAt = formatPostDate(date);
  return (
    <div className="flex gap-2 items-center">
      <Link to={`/profile/${author.username}`} className="font-bold">
        {author.displayName || author.username}
      </Link>
      <span className="text-gray-700 flex gap-1 text-sm">
        <Link to={`/profile/${author.username}`}>@{author.username}</Link>
        <span>·</span>
        <span>{createdAt}</span>
      </span>
    </div>
  );
};

export default PostInfo;
