import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../helper/formatDate";

const PostInfo = ({ author, createDate, postId }) => {
  const date = formatDate(createDate, "post");
  const { postId: postParam } = useParams();
  const isViewingPost = postParam === postId;
  return (
    <div className="flex items-center gap-2">
      <Link to={`/profile/${author.username}`} className="font-bold">
        {author.displayName || author.username}
      </Link>
      <div className="flex gap-1 text-sm text-gray-700">
        <Link to={`/profile/${author.username}`}>@{author.username}</Link>
        {!isViewingPost && (
          <>
            <span>·</span>
            <span>{date}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
