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
import { SEO } from "../components/common/SEO";

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
      <SEO title="Notifications / Mesom" />
      <NotificationHeader activeTab={activeTab} onTabChange={onTabChange} />
      <div>
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {data?.pages[0]?.message && (
          <section className="mt-0.5 flex justify-center p-8">
            <div className="flex max-w-sm flex-col items-center gap-6">
              <span className="relative h-52 w-full overflow-hidden">
                <img
                  alt="No Notifications"
                  src="/no-notifications.png"
                  className="absolute inset-0 m-auto object-cover p-0"
                />
              </span>
              <div className="flex flex-col gap-2 text-center">
                <p className="text-3xl font-extrabold">
                  No{" "}
                  {activeTab === "allNotifications"
                    ? "notifications"
                    : "mentions"}{" "}
                  yet
                </p>
                <p className="text-light-secondary dark:text-dark-secondary">
                  When you get{" "}
                  {activeTab === "allNotifications"
                    ? "notifications"
                    : "mentions"}
                  , they’ll show up here
                </p>
              </div>
            </div>
          </section>
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
