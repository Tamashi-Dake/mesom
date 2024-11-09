import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../helper/formatDate";

const PostInfo = ({ author, createDate, postId }) => {
  const date = formatDate(createDate, "post");
  const { postId: postParam } = useParams();
  const isViewingPost = postParam === postId;
  return (
    <div className="flex gap-2 items-center">
      <Link to={`/profile/${author.username}`} className="font-bold">
        {author.displayName || author.username}
      </Link>
      <span className="text-gray-700 flex gap-1 text-sm">
        <Link to={`/profile/${author.username}`}>@{author.username}</Link>
        {!isViewingPost && (
          <>
            <span>·</span>
            <span>{date}</span>
          </>
        )}
      </span>
    </div>
  );
};

export default PostInfo;
