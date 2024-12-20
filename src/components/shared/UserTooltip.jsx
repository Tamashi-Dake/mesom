import { twMerge } from "tailwind-merge";
import ProfileImages from "../profile/ProfileImages";
import FollowButton from "./FollowButton";
import useCurrentUser from "../../hooks/useCurrentUser";

const UserTooltip = ({ children, user, inPost, inModal }) => {
  const currentUser = useCurrentUser();
  const isMyProfile = currentUser.data?._id === user?._id;
  return (
    <>
      <div className="group relative">
        {children}
        <div
          role="tooltip"
          className={twMerge(
            "menu-container invisible absolute left-1/2 w-72 rounded-2xl bg-white p-3 text-black opacity-0 [transition:visibility_0ms_ease_400ms,opacity_200ms_ease_200ms] sm:group-hover:visible sm:group-hover:opacity-100 sm:group-hover:delay-500",
            inPost ? "" : "-translate-x-1/2",
            inModal ? "hidden" : "",
          )}
        >
          <a href={`/profile/${user?.username}`}>
            <ProfileImages
              inUserTooltip
              avatarImg={user?.profile.avatarImg}
              coverImg={user?.profile.coverImg}
            />
            <div className="mt-2 flex justify-end">
              {!isMyProfile && <FollowButton userId={user?._id} />}
            </div>

            <div
              className={twMerge(
                "flex justify-between truncate",
                isMyProfile ? "mt-7" : "",
              )}
            >
              <div className="flex flex-col gap-1">
                <p className="truncate text-base font-semibold leading-none text-gray-900 hover:underline">
                  {user?.displayName || user?.username}
                </p>
                <p className="mb-3 text-sm font-normal">@{user?.username}</p>
              </div>
            </div>

            <p className="mb-4 whitespace-pre-line break-words text-sm">
              {user?.profile.bio}
            </p>
            <ul className="flex text-sm">
              <li className="me-2 hover:underline">
                <span className="font-semibold text-gray-900">
                  {user?.following.length || 0}
                </span>
                <span> Following</span>
              </li>
              <li className="me-2 hover:underline">
                <span className="font-semibold text-gray-900">
                  {user?.followers.length || 0}
                </span>
                <span> Followers</span>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </>
  );
};

export default UserTooltip;
