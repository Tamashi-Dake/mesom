import { useState } from "react";

import {
  getMentions,
  getNotifications,
} from "../services/notificationsService";

import NotificationHeader from "../components/layout/NotificationHeader";
import Notification from "../components/notification/Notification";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Post from "../components/post/Post";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("allNotifications");

  const { data, isLoading, isFetchingNextPage, ref } = useInfiniteScroll(
    ["notifications", activeTab],
    ({ pageParam = 0 }) => {
      if (activeTab === "allNotifications") {
        return getNotifications({ skip: pageParam });
      }
      if (activeTab === "mentions") {
        return getMentions({ skip: pageParam });
      }
    },
    (lastPage) => lastPage.nextSkip || undefined,
  );

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <NotificationHeader activeTab={activeTab} onTabChange={onTabChange} />
      <div>
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {data?.totalNotifications === 0 && (
          <div className="p-4 text-center font-bold">
            You have no notifications{" "}
          </div>
        )}

        {activeTab === "allNotifications" &&
          data?.pages.map((notificationPageInfo) =>
            notificationPageInfo?.notifications?.map((notification, index) => {
              const isAlmostLastNotification =
                index === notificationPageInfo.notifications.length - 1;

              return (
                <Notification
                  innerRef={isAlmostLastNotification ? ref : null}
                  key={notification._id}
                  notification={notification}
                />
              );
            }),
          )}
        {activeTab === "mentions" &&
          data?.pages.map((mentionPageInfo) =>
            mentionPageInfo?.mentions?.map((mention, index) => {
              const isAlmostLastMention =
                index === mentionPageInfo.mentions.length - 1;
              return (
                <Post
                  innerRef={isAlmostLastMention ? ref : null}
                  key={mention.post._id}
                  post={mention.post}
                  author={mention?.from}
                  queryType={activeTab}
                />
              );
            }),
          )}
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
};

export default Notifications;
