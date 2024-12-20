import { useModal } from "../../hooks/useModal";

// import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import DefaultHeader from "../layout/DefaultHeader";
import UpdateUserModal from "../modal/UpdateUserModal";
import Button from "../shared/Button";

import FollowButton from "../shared/FollowButton";
import ProfileImages from "./ProfileImages";
import ProfileInfo from "./ProfileInfo";

const UserProfile = ({ userQuery, isMyProfile }) => {
  const { data: user, isFetching, isLoading } = userQuery;
  const updateUserModal = useModal();

  return (
    <>
      {/* TODO: Add case when User not found */}
      {(isLoading || isFetching) && <p>loading...</p>}

      {!isFetching && user && (
        <>
          <DefaultHeader
            label={user.displayName || user.username}
            additionalContent="0 post"
            showBackArrow
          />

          <ProfileImages
            avatarImg={user?.profile.avatarImg}
            coverImg={user?.profile.coverImg}
          />

          <div className="mt-4 flex justify-end px-4">
            {isMyProfile ? (
              <Button
                secondary
                label={"Edit profile"}
                disabled={updateUserModal.open}
                onClick={updateUserModal.openModal}
              />
            ) : (
              <FollowButton userId={user._id} />
            )}
          </div>

          {updateUserModal.open && (
            <UpdateUserModal modal={updateUserModal} user={user} />
          )}

          <ProfileInfo user={user} />
        </>
      )}
    </>
  );
};
export default UserProfile;
