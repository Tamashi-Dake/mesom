import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services/postsService";

import CreatePost from "../components/post/CreatePost";
import Post from "../components/post/Post";
import { useParams } from "react-router-dom";
import DefaultHeader from "../components/layout/DefaultHeader";

const PostPage = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
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
        {data && (
          <Post
            post={data}
            // queryType={queryType}
          />
        )}
        <CreatePost postId={postId} isReply />
      </main>
    </>
  );
};

export default PostPage;
