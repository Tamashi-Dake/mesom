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
                  date={parentPost.createdAt}
                />
                <PostOptions
                  authorId={parentPost._id}
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
                <PostInfo author={post.author} date={post.createdAt} />
                <PostOptions authorId={post.author._id} postId={post._id} />
              </div>
              <PostContent textContent={post.text} images={post.images} />
              <PostActions post={post} />
            </div>
          </div>
        )}
        <CreatePost
          postId={postId}
          isReply
          authorName={parentPost?.author.username}
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
