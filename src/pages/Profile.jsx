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
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useCurrentUser from "../hooks/useCurrentUser";
import getMessageForTab from "../helper/getMessageForTab";

const Profile = () => {
  const { username } = useParams();
  const currentUser = useCurrentUser();

  const [postType, setPostType] = useState("userPosts");
  const userQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserByUsername(username),
  });
  const userId = userQuery.data?._id;
  const isMyProfile = currentUser.data?._id === userId;
  const currentTabMessage = getMessageForTab(postType, isMyProfile, username);

  const { data, isFetchingNextPage, ref, refetch } = useInfiniteScroll(
    ["posts", postType],
    ({ pageParam = 0 }) => {
      if (!userId) return;
      switch (postType) {
        case "userPosts":
          return getPostsByUser({ userId: userId, skip: pageParam });
        case "userReplies":
          return getRepliesByUser({ userId: userId, skip: pageParam });
        case "userMedias":
          return getMediasByUser({ userId: userId, skip: pageParam });
        case "userLikes":
          return getLikesByUser({ userId: userId, skip: pageParam });
      }
    },
    (lastPage) => lastPage?.nextSkip || undefined,
    { enabled: !!userId && !userQuery.isLoading },
  );

  useEffect(() => {
    userQuery?.refetch();
  }, [username]);

  useEffect(() => {
    refetch();
  }, [userId]);

  return (
    <>
      <UserProfile userQuery={userQuery} isMyProfile={isMyProfile} />

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

      {data?.pages[0]?.message ? (
        <section className="mt-0.5 flex justify-center p-8">
          <div className="flex max-w-sm flex-col items-center gap-6">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-3xl font-extrabold">
                {currentTabMessage.title}
              </p>
              <p className="text-light-secondary dark:text-dark-secondary">
                {currentTabMessage.description}
              </p>
            </div>
          </div>
        </section>
      ) : (
        data?.pages.map((postPageInfo) =>
          postPageInfo?.posts.map((post, index) => {
            const isPostBeforeLastPost =
              index === postPageInfo.posts.length - 1;
            return (
              <Post
                innerRef={isPostBeforeLastPost ? ref : null}
                key={post._id}
                post={post}
                queryType={postType}
              />
            );
          }),
        )
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
};
export default Profile;
