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
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import LoadingSpinner from "../components/common/LoadingSpinner";

const PostPage = () => {
  const { postId } = useParams();

  // TODO: Like không cập nhật khi mở nhiều tabs
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: errorPost,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  const { data: parentPost } = useQuery({
    queryKey: ["post", post?.parent?.parentPostID],
    queryFn: () => getPost(post?.parent?.parentPostID),
    enabled: !!post?.parent?.parentPostID,
  });

  const {
    data: replies,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll(
    ["post", postId, "reply"],
    ({ pageParam = 0 }) =>
      getRepliesForPost({ postId: postId, skip: pageParam }),
    (lastPage) => lastPage.nextSkip || undefined,
  );
  return (
    <>
      <DefaultHeader label="Post" showBackArrow />
      <main>
        {isPostLoading && <div>Loading...</div>}
        {isPostError && <div>Error: {errorPost.message}</div>}

        {parentPost &&
          (!parentPost?.deleted ? (
            <Link
              to={`/post/${parentPost?._id}`}
              className="flex flex-1 items-start gap-2 p-4 transition-all hover:bg-neutral-100/90"
            >
              <AuthorAvatar author={parentPost.author} isReply />
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
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
          ) : (
            <div className="border-b border-gray-200">
              <h4 className="m-4 rounded-2xl bg-neutral-100 px-4 py-2 text-base font-light text-gray-500">
                This post was deleted by the author.
              </h4>
            </div>
          ))}

        {post &&
          (!post?.deleted ? (
            <>
              <div className="flex flex-1 items-start gap-2 border-b border-gray-200 p-4 transition-all">
                <AuthorAvatar author={post.author} />

                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <PostInfo
                      author={post.author}
                      createDate={post.createdAt}
                      postId={post._id}
                    />
                    <PostOptions
                      authorName={post.author.username}
                      authorId={post.author._id}
                      postId={post._id}
                      queryType={postId}
                    />
                  </div>
                  {parentPost && (
                    <p className="text-sm text-gray-400 text-light-secondary dark:text-dark-secondary">
                      Replying to{" "}
                      <Link
                        to={`/user/${parentPost?.author?.username}`}
                        className="custom-underline text-blue-500 text-main-accent"
                      >
                        @{parentPost?.author?.username}
                      </Link>
                    </p>
                  )}
                  <PostContent textContent={post.text} images={post.images} />
                  <div className="flex items-center gap-1">
                    <PostDate createdAt={post.createdAt} />
                    <span>·</span>
                    <span className="text-sm text-neutral-600">
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
              <CreatePost
                postId={postId}
                isReply
                authorName={post?.author?.username}
                modal
              />
              {!replies?.pages[0]?.message &&
                replies?.pages.map((replyPageInfo) =>
                  replyPageInfo.posts.map((reply, index) => {
                    const isPostBeforeLastPost =
                      index === replyPageInfo.posts.length - 1;
                    return (
                      <Post
                        innerRef={isPostBeforeLastPost ? ref : null}
                        key={reply._id}
                        post={reply}
                        queryType={[postId, "reply"]}
                      />
                    );
                  }),
                )}
              {isFetchingNextPage && <LoadingSpinner />}
            </>
          ) : (
            <div className="text-center">
              <h4 className="m-4 rounded-2xl px-4 py-2 text-base font-light text-gray-500">
                Post not found.
              </h4>
            </div>
          ))}
      </main>
    </>
  );
};

export default PostPage;
