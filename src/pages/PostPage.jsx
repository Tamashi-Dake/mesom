import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { getPost, getRepliesForPost } from "../services/postsService";

import CreatePost from "../components/post/CreatePost";
import DefaultHeader from "../components/layout/DefaultHeader";
import AuthorAvatar from "../components/post/AuthorAvatar";
import PostInfo from "../components/post/PostInfo";
import PostOptions from "../components/post/PostOptions";
import PostContent from "../components/post/PostContent";
import PostActions from "../components/post/PostActions";
import Post from "../components/post/Post";
import PostDate from "../components/post/PostDate";
import PostStatus from "../components/post/PostStatus";

const PostPage = () => {
  const { postId } = useParams();

  // TODO: Like không cập nhật khi mở nhiều tabs
  const {
    data: post,
    isPostLoading,
    isPostError,
    errorPost,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  const {
    data: parentPost,
    isParentPostLoading,
    isParentPostError,
    errorParentPost,
  } = useQuery({
    queryKey: ["post", post?.parent?.parentPostID],
    queryFn: () => getPost(post?.parent?.parentPostID),
    enabled: !!post?.parent?.parentPostID,
  });

  const {
    data: replies,
    isReplyLoading,
    isReplyError,
    errorReply,
  } = useQuery({
    queryKey: ["post", postId, "reply"],
    queryFn: () => getRepliesForPost(postId),
  });

  return (
    <>
      <DefaultHeader label="Post" showBackArrow />
      <main>
        {isPostLoading && <div>Loading...</div>}
        {isPostError && <div>Error: {errorPost.message}</div>}

        {parentPost && (
          <Link
            to={`/post/${parentPost?._id}`}
            className="flex flex-1 gap-2 items-start p-4  hover:bg-neutral-100/90 transition-all"
          >
            <AuthorAvatar author={parentPost.author} isReply />
            <div className="flex flex-col flex-1">
              <div className="flex gap-2 items-center justify-between">
                <PostInfo
                  author={parentPost.author}
                  createDate={parentPost.createdAt}
                  postId={parentPost._id}
                />
                <PostOptions
                  authorId={parentPost._id}
                  // TODO: Might need queryType
                  //  queryType={queryType}
                />
              </div>
              <PostContent
                textContent={parentPost.text}
                images={parentPost.images}
              />
              <PostActions post={parentPost} />
            </div>
          </Link>
        )}

        {post && (
          <div className="flex flex-1 gap-2 items-start p-4 border-b border-gray-200 transition-all">
            <AuthorAvatar author={post.author} />

            <div className="flex flex-col flex-1">
              <div className="flex gap-2 items-center justify-between">
                <PostInfo
                  author={post.author}
                  createDate={post.createdAt}
                  postId={post._id}
                />
                <PostOptions authorId={post.author._id} postId={post._id} />
              </div>
              {parentPost && (
                <p className="text-light-secondary text-gray-400 text-sm dark:text-dark-secondary">
                  Replying to{" "}
                  <Link to={`/user/${parentPost.author.username}`}>
                    <a className="custom-underline text-main-accent text-blue-500">
                      @{parentPost.author.username}
                    </a>
                  </Link>
                </p>
              )}
              <PostContent textContent={post.text} images={post.images} />
              <div className="flex gap-1 items-center">
                <PostDate createdAt={post.createdAt} />
                <span>·</span>
                <span className="text-neutral-600 text-sm">
                  {post.views} {post.views > 1 ? "views" : "view"}
                </span>
              </div>
              <PostStatus
                totalReplies={post.userReplies}
                userLikes={post.userLikes}
                userShares={post.userShared}
              />
              <PostActions post={post} />
            </div>
          </div>
        )}
        <CreatePost
          postId={postId}
          isReply
          authorName={post?.author.username}
          modal
        />
        {replies?.posts?.map((reply) => (
          <Post key={reply._id} post={reply} queryType={[postId, "reply"]} />
        ))}
      </main>
    </>
  );
};

export default PostPage;
