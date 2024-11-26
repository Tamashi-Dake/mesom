import AuthorAvatar from "./AuthorAvatar";
import PostInfo from "./PostInfo";
import PostOptions from "./PostOptions";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { Link } from "react-router-dom";

const Post = ({ post, author, queryType, inReplyModal, innerRef }) => {
  const isReply = !!post.parent;
  const authorName = post?.parent?.authorName;
  // console.log("rerender post", post.text);
  return (
    // Invalid: bị lồng thẻ a
    <Link
      ref={innerRef}
      to={`/post/${post?._id}`}
      className="flex flex-1 items-start gap-2 border-b border-gray-200 px-4 py-3 transition-all ease-in-out hover:cursor-pointer"
    >
      <AuthorAvatar author={author || post.author} isReply={inReplyModal} />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <PostInfo
            author={author || post.author}
            createDate={post.createdAt}
            postId={post._id}
          />
          {!inReplyModal && (
            <PostOptions
              authorId={author?._id || post.author._id}
              authorName={author?.username || post.author.username}
              postId={post._id}
              queryType={queryType}
            />
          )}
        </div>
        {isReply && (
          <p className="text-sm text-gray-400 text-light-secondary dark:text-dark-secondary">
            Replying to{" "}
            <Link
              to={`/user/${authorName}`}
              className="custom-underline text-blue-500 text-main-accent"
            >
              @{authorName}
            </Link>
          </p>
        )}
        <PostContent textContent={post.text} images={post.images} />
        {queryType && queryType !== "mentions" && (
          <PostActions post={post} queryType={queryType} />
        )}
        {inReplyModal && (
          <div className="reply-hint mt-2 flex gap-1">
            <span className="text-neutral-500">Replying to</span>
            {/* TODO: Add accent color */}
            <Link
              to={`/profile/${post.author.username}`}
              className="text-blue-500"
            >
              @{post.author.username}
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
};
export default Post;
