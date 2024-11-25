import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUserByUsername } from "../services/userService";
import {
  getLikesByUser,
  getMediasByUser,
  getPostsByUser,
  getRepliesByUser,
} from "../services/postsService";

import Tab from "../components/common/Tab";
import UserProfile from "../components/profile/UserProfile";
import Post from "../components/post/Post";

const Profile = () => {
  const { username } = useParams();
  const [postType, setPostType] = useState("userPosts");
  const userQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserByUsername(username),
  });
  const userId = userQuery.data?._id;

  const postQuery = useQuery({
    queryKey: ["posts", postType],
    queryFn: () => {
      if (!userId) return null;
      switch (postType) {
        case "userPosts":
          return getPostsByUser(userId);
        case "userReplies":
          return getRepliesByUser(userId);
        case "userMedias":
          return getMediasByUser(userId);
        case "userLikes":
          return getLikesByUser(userId);
        default:
          return null;
      }
    },
    enabled: !!userId, // Chỉ gửi request khi có userId
  });

  useEffect(() => {
    userQuery?.refetch();
  }, [username]);

  useEffect(() => {
    postQuery?.refetch();
  }, [userId]);

  return (
    <>
      <UserProfile userQuery={userQuery} />

      <div className="flex border-b-[1px]">
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
          isActive={postType === "userMedias"}
          onClick={() => setPostType("userMedias")}
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
