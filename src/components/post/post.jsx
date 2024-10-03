import AuthorAvatar from "./AuthorAvatar";
import PostInfo from "./PostInfo";
import PostOptions from "./PostOptions";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { Link } from "react-router-dom";

const Post = ({ post, queryType }) => {
  console.log("rerender", post.text);
  return (
    <Link
      to={`/post/${post?._id}`}
      className="flex flex-1 gap-2 items-start p-4 border-b border-gray-200 hover:bg-neutral-100/90 transition-all"
    >
      <AuthorAvatar author={post.author} />
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center justify-between">
          <PostInfo author={post.author} date={post.createdAt} />
          <PostOptions
            authorId={post.author._id}
            postId={post._id}
            queryType={queryType}
          />
        </div>
        <PostContent textContent={post.text} images={post.images} />
        <PostActions post={post} queryType={queryType} />
      </div>
    </Link>
  );
};
export default Post;
