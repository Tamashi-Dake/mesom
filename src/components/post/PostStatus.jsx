import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const PostStatus = ({ totalReplies, userLikes, userShares }) => {
  const totalLikes = userLikes.length;
  const totalShares = userShares.length;

  const [{ currentReplies, currentTweets, currentLikes }, setCurrentStats] =
    useState({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalShares,
    });

  useEffect(() => {
    setCurrentStats({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalShares,
    });
  }, [totalReplies, totalLikes, totalShares]);

  const isStatsVisible = !!(totalReplies || totalShares || totalLikes);

  console.log(totalReplies, totalShares, totalLikes);

  const allStats = [
    ["Reply", null, currentReplies],
    ["Share", "Shares", currentTweets],
    ["Like", "likes", currentLikes],
  ];

  //   TODO: Add Users share/like modal
  return (
    <>
      {isStatsVisible && (
        <div
          className="flex gap-4 px-1 py-4 text-light-secondary dark:text-dark-secondary
                     [&>button>div]:font-bold [&>button>div]:text-light-primary 
                     dark:[&>button>div]:text-dark-primary border-y-[1px]"
        >
          {allStats.map(
            ([title, type, stats], index) =>
              !!stats && (
                <button
                  className={twMerge(
                    `hover-animation mt-0.5 mb-[3px] flex h-4 items-center gap-1 border-b 
                     border-b-transparent outline-none hover:border-b-light-primary 
                     focus-visible:border-b-light-primary dark:hover:border-b-dark-primary
                     dark:focus-visible:border-b-dark-primary text-sm`,
                    index === 0 && "cursor-not-allowed"
                  )}
                  key={title}
                  //   onClick={type ? handleOpen(type) : undefined}
                >
                  <span className="font-semibold">{stats}</span>
                  <p className="text-neutral-600">{`${
                    stats === 1
                      ? title
                      : stats > 1 && index === 0
                      ? `${title.slice(0, -1)}ies`
                      : `${title}s`
                  }`}</p>
                </button>
              )
          )}
        </div>
      )}
    </>
  );
};

export default PostStatus;
