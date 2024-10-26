import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useDelayedQuery } from "../hooks/useDelayAPI";

import { getUserByUsername } from "../services/userService";
import { getLikesByUser, getPostsByUser } from "../services/postsService";

import Tab from "../components/common/Tab";
import UserProfile from "../components/profile/UserProfile";
import Post from "../components/post/Post";

const Profile = () => {
  const { username } = useParams();
  const [postType, setPostType] = useState("userPosts");

  const userQuery = useDelayedQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserByUsername(username),
    delay: 1000,
  });

  const postQuery = useQuery({
    queryKey: ["posts", postType],
    queryFn: () => {
      if (postType === "userPosts") {
        return getPostsByUser(userQuery.data._id);
      }
      if (postType === "userLikes") {
        return getLikesByUser(userQuery.data._id);
      }
    },
  });

  useEffect(() => {
    userQuery?.refetch();
  }, [username]);

  useEffect(() => {
    postQuery?.refetch();
  }, [userQuery.data?._id]);

  return (
    <>
      <UserProfile userQuery={userQuery} />

      <div className="border-b-[1px] flex">
        <Tab
          label="Posts"
          isActive={postType === "userPosts"}
          onClick={() => setPostType("userPosts")}
        />
        <Tab
          label="Replies"
          isActive={postType === "userReplies"}
          onClick={() => setPostType("userReplies")}
        />
        <Tab
          label="Media"
          isActive={postType === "userMedia"}
          onClick={() => setPostType("userMedia")}
        />
        <Tab
          label="Likes"
          isActive={postType === "userLikes"}
          onClick={() => setPostType("userLikes")}
        />
      </div>

      {postQuery.data?.posts?.map((post) => (
        <Post key={post._id} post={post} queryType={postType} />
      ))}
    </>
  );
};
export default Profile;
