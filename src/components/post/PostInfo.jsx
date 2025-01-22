import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../helper/formatDate";
import UserTooltip from "../shared/UserTooltip";
import { twMerge } from "tailwind-merge";

const PostInfo = ({ author, createDate, postId, inModal }) => {
  const date = formatDate(createDate, "post");
  const { postId: postParam } = useParams();
  const isViewingPost = postParam === postId;
  return (
    <div className="flex items-center gap-2">
      <Link to={`/profile/${author.username}`}>
        <UserTooltip user={author} inPost inModal={inModal}>
          <div className="flex flex-col">
            <span
              className={twMerge(
                "truncate whitespace-pre-line break-words font-bold hover:underline",
                inModal ? "max-h-5 max-w-40 overflow-hidden" : "",
              )}
            >
              {author.displayName || author.username}
            </span>
            {isViewingPost && (
              <span className="truncate whitespace-pre-line break-words text-sm text-main-secondary">
                @{author.username}
              </span>
            )}
          </div>
        </UserTooltip>
      </Link>
      {!isViewingPost && (
        <div className="flex gap-1 text-sm text-main-secondary">
          <UserTooltip user={author} inPost>
            <Link
              to={`/profile/${author.username}`}
              className="truncate whitespace-pre-line break-words"
            >
              @{author.username}
            </Link>
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
