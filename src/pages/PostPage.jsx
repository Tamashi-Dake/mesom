import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services/postsService";

import CreatePost from "../components/post/CreatePost";
import { useParams } from "react-router-dom";
import DefaultHeader from "../components/layout/DefaultHeader";
import AuthorAvatar from "../components/post/AuthorAvatar";
import PostInfo from "../components/post/PostInfo";
import PostOptions from "../components/post/PostOptions";
import PostContent from "../components/post/PostContent";
import PostActions from "../components/post/PostActions";

const PostPage = () => {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });
  return (
    <>
      <DefaultHeader label="Post" showBackArrow />
      <main>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        {/* TODO: sửa queryType trong PostPage */}
        {post && (
          <div className="flex flex-1 gap-2 items-start p-4 border-b border-gray-200 hover:bg-neutral-100/90 transition-all">
            <AuthorAvatar author={post.author} />
            <div className="flex flex-col flex-1">
              <div className="flex gap-2 items-center justify-between">
                <PostInfo author={post.author} createdAt={post.createdAt} />
                <PostOptions
                  authorId={post.author._id}
                  postId={post._id}
                  //  queryType={queryType}
                />
              </div>
              <PostContent textContent={post.text} images={post.images} />
              <PostActions
                post={post}
                //  queryType={queryType}
              />
            </div>
          </div>
        )}
        <CreatePost postId={postId} isReply />
      </main>
    </>
  );
};

export default PostPage;
