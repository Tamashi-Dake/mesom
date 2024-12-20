import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../helper/formatDate";
import UserTooltip from "../shared/UserTooltip";

const PostInfo = ({ author, createDate, postId, inModal }) => {
  const date = formatDate(createDate, "post");
  const { postId: postParam } = useParams();
  const isViewingPost = postParam === postId;
  return (
    <div className="flex items-center gap-2">
      <Link to={`/profile/${author.username}`}>
        <UserTooltip user={author} inPost inModal={inModal}>
          <div className="flex flex-col">
            <span className="font-bold hover:underline">
              {author.displayName || author.username}
            </span>
            {isViewingPost && (
              <span className="text-sm text-gray-700">@{author.username}</span>
            )}
          </div>
        </UserTooltip>
      </Link>
      {!isViewingPost && (
        <div className="flex gap-1 text-sm text-gray-700">
          <UserTooltip user={author} inPost>
            <Link to={`/profile/${author.username}`}>@{author.username}</Link>
          </UserTooltip>

          <>
            <span>·</span>
            <span>{date}</span>
          </>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
