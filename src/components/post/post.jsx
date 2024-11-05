import AuthorAvatar from "./AuthorAvatar";
import PostInfo from "./PostInfo";
import PostOptions from "./PostOptions";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { Link } from "react-router-dom";

const Post = ({ post, author, queryType }) => {
  const isReply = !!post.parent;
  const authorName = post?.parent?.authorName;
  console.log("rerender post", post.text);
  return (
    <Link
      to={`/post/${post?._id}`}
      className="flex flex-1 gap-2 items-start p-4 border-b border-gray-200 transition-all hover:cursor-pointer"
    >
      <AuthorAvatar author={author || post.author} />
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center justify-between">
          <PostInfo author={author || post.author} date={post.createdAt} />
          <PostOptions
            authorId={author?._id || post.author._id}
            postId={post._id}
            queryType={queryType}
          />
        </div>
        {isReply && (
          <p className="text-light-secondary text-gray-400 text-sm dark:text-dark-secondary">
            Replying to{" "}
            <Link to={`/user/${authorName}`}>
              <a className="custom-underline text-main-accent text-blue-500">
                @{authorName}
              </a>
            </Link>
          </p>
        )}
        <PostContent textContent={post.text} images={post.images} />
        {queryType !== "mentions" && (
          <PostActions post={post} queryType={queryType} />
        )}{" "}
      </div>
    </Link>
  );
};
export default Post;
