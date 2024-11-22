import {
  FaTrash,
  FaUser,
  FaUserCheck,
  FaUserSlash,
  FaUserXmark,
} from "react-icons/fa6";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useDeletePost } from "../../hooks/usePost";
import {
  IoIosMore,
  IoIosNotifications,
  IoIosNotificationsOff,
} from "react-icons/io";
import {
  Button,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import cn from "clsx";
import { ToolTip } from "../common/Tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "../modal/Modal";
import { ActionModal } from "../modal/ActionModal";
import { BsPinAngle } from "react-icons/bs";
import { useModal } from "../../hooks/useModal";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { RiUnpinLine } from "react-icons/ri";
import { useFollowUser } from "../../hooks/useUser";
import { popupVariant } from "../shared/config";

const pinModalData = [
  {
    title: "Pin Tweet to from profile?",
    description:
      "This will appear at the top of your profile and replace any previously pinned Tweet.",
    mainBtnLabel: "Pin",
  },
  {
    title: "Unpin Tweet from profile?",
    description:
      "This will no longer appear automatically at the top of your profile.",
    mainBtnLabel: "Unpin",
  },
];

const blockUserModalData = [
  {
    title: "Block this user?",
    description:
      "Blocking this user will prevent them from interacting with you, including sending you messages and notifications.",
    mainBtnLabel: "Block",
  },
  {
    title: "Unblock this user?",
    description:
      "Unblocking will allow the user to interact with you again, including sending messages and notifications.",
    mainBtnLabel: "Unblock",
  },
];

const blockPostNotificationsData = [
  {
    title: "Block notifications for this post?",
    description:
      "You will no longer receive notifications for comments, likes, or shares on this post.",
    mainBtnLabel: "Block Notifications",
  },
  {
    title: "Unblock notifications for this post?",
    description:
      "You will start receiving notifications for comments, likes, or shares on this post again.",
    mainBtnLabel: "Unblock Notifications",
  },
];

const PostOptions = ({ authorId, authorName, postId, queryType }) => {
  const currentUser = useCurrentUser();
  const isOwner = currentUser.data._id === authorId;
  const isPinned = currentUser.data.pinnedPost === postId;
  const [userIsBlocked, setUserIsBlocked] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(true);
  const userIsFollowed = currentUser.data.following.includes(authorId);

  const deleteMutation = useDeletePost(queryType, postId);
  const followMutation = useFollowUser(authorId, true);

  const {
    open: removeOpen,
    openModal: removeOpenModal,
    closeModal: removeCloseModal,
  } = useModal();
  const {
    open: pinOpen,
    openModal: pinOpenModal,
    closeModal: pinCloseModal,
  } = useModal();
  const {
    open: blockOpen,
    openModal: blockOpenModal,
    closeModal: blockCloseModal,
  } = useModal();
  const {
    open: allowNotiOpen,
    openModal: allowNotiOpenModal,
    closeModal: allowNotiCloseModal,
  } = useModal();
  const currentPinModalData = useMemo(() => pinModalData[+isPinned], [pinOpen]);
  const currentBlockUserModalData = useMemo(
    () => blockUserModalData[+userIsBlocked],
    [blockOpen]
  );
  const currentBlockPostNotificationsData = useMemo(
    () => blockPostNotificationsData[+allowNotifications],
    [allowNotiOpen]
  );

  const handleDeletePost = (event) => {
    event.preventDefault();
    removeCloseModal();
    // deleteMutation.mutate(postId);
  };
  const handlePin = (event) => {
    event.preventDefault();
    pinCloseModal();
    toast.success("pin post");
  };
  const handleFollow = (event, closeMenu) => {
    event.preventDefault();
    followMutation.mutate({ userId: authorId, notificationType: "follow" });
    closeMenu();
  };
  const handleBlock = (event) => {
    event.preventDefault();
    setUserIsBlocked(!userIsBlocked);
    blockCloseModal();
  };
  const handleBlockNotifications = (event) => {
    event.preventDefault();
    setAllowNotifications(!allowNotifications);
    allowNotiCloseModal();
  };

  return (
    <>
      <Popover>
        {({ open, close }) => (
          <>
            <PopoverButton
              as={Button}
              className={cn(
                `main-tab group rounded-full top-2 right-2 p-2 hover:bg-accent-blue/10 focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20`,
                open && "bg-accent-blue/10 [&>div>svg]:text-accent-blue"
              )}
            >
              <div className="group relative">
                <IoIosMore className=" h-5 w-5 text-light-secondary group-hover:text-accent-blue  group-focus-visible:text-accent-blue dark:text-dark-secondary/80" />
                {!open && <ToolTip tip="More" />}
              </div>
            </PopoverButton>
            <AnimatePresence>
              {open && (
                <PopoverPanel
                  className="menu-container bg-white group absolute z-[9] right-2 whitespace-nowrap text-light-primary dark:text-dark-primary dark:text-neutral-700"
                  as={motion.div}
                  {...popupVariant}
                  static
                >
                  {isOwner && (
                    <PopoverButton
                      as={Button}
                      className="accent-tab flex w-full items-center gap-3 rounded-md rounded-b-none p-4 text-accent-red hover:bg-main-sidebar-background"
                      onClick={(event) => {
                        event.preventDefault();
                        removeOpenModal();
                      }}
                    >
                      <FaTrash />
                      Delete
                    </PopoverButton>
                  )}

                  {isOwner ? (
                    <PopoverButton
                      className="accent-tab flex w-full items-center gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background"
                      as={Button}
                      onClick={(event) => {
                        event.preventDefault();
                        pinOpenModal();
                      }}
                    >
                      {isPinned ? (
                        <>
                          <RiUnpinLine />
                          Unpin from profile
                        </>
                      ) : (
                        <>
                          <BsPinAngle />
                          Pin to your profile
                        </>
                      )}
                    </PopoverButton>
                  ) : (
                    <>
                      <PopoverButton
                        className="accent-tab flex w-full items-center gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background"
                        as={Button}
                        onClick={(e) => {
                          handleFollow(e, close);
                        }}
                      >
                        {userIsFollowed ? (
                          <>
                            <FaUserXmark />
                            Unfollow @{authorName}
                          </>
                        ) : (
                          <>
                            <FaUserCheck />
                            Follow @{authorName}
                          </>
                        )}
                      </PopoverButton>
                      <PopoverButton
                        className="accent-tab flex w-full items-center gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background"
                        as={Button}
                        onClick={(event) => {
                          event.preventDefault();
                          blockOpenModal();
                        }}
                      >
                        {userIsBlocked ? (
                          <>
                            <FaUser />
                            Unblock @{authorName}
                          </>
                        ) : (
                          <>
                            <FaUserSlash />
                            Block @{authorName}
                          </>
                        )}
                      </PopoverButton>
                    </>
                  )}
                  <PopoverButton
                    className="accent-tab flex w-full items-center gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background"
                    as={Button}
                    onClick={(event) => {
                      event.preventDefault();
                      allowNotiOpenModal();
                    }}
                  >
                    {allowNotifications ? (
                      <>
                        <IoIosNotificationsOff />
                        Block notifications for this post
                      </>
                    ) : (
                      <>
                        <IoIosNotifications />
                        Allow notifications for this post
                      </>
                    )}
                  </PopoverButton>
                </PopoverPanel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
      <Modal
        modalClassName="max-w-xs relative bg-white bg-main-background w-full p-8 rounded-2xl"
        open={removeOpen}
        closeModal={removeCloseModal}
        actionModal
      >
        <ActionModal
          title="Delete Tweet?"
          description={`This can’t be undone and it will be removed from your
          profile, the timeline of any accounts that follow you, and from Mesom search results.`}
          mainBtnClassName="bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab
                            focus-visible:bg-accent-red/90"
          mainBtnLabel="Delete"
          action={handleDeletePost}
          closeModal={removeCloseModal}
        />
      </Modal>
      <Modal
        modalClassName="max-w-xs relative bg-white bg-main-background w-full p-8 rounded-2xl"
        open={pinOpen}
        closeModal={pinCloseModal}
        actionModal
      >
        <ActionModal
          {...currentPinModalData}
          mainBtnClassName="bg-light-primary hover:bg-light-primary/90 active:bg-light-primary/80 dark:text-light-primarydark:bg-light-border dark:hover:bg-light-border/90 dark:active:bg-light-border/75"
          action={handlePin}
          closeModal={pinCloseModal}
        />
      </Modal>
      <Modal
        modalClassName="max-w-xs relative bg-white bg-main-background w-full p-8 rounded-2xl"
        open={blockOpen}
        closeModal={blockCloseModal}
        actionModal
      >
        <ActionModal
          {...currentBlockUserModalData}
          mainBtnClassName="bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab
                            focus-visible:bg-accent-red/90"
          action={handleBlock}
          closeModal={blockCloseModal}
        />
      </Modal>
      <Modal
        modalClassName="max-w-xs relative bg-white bg-main-background w-full p-8 rounded-2xl"
        open={allowNotiOpen}
        closeModal={allowNotiCloseModal}
        actionModal
      >
        <ActionModal
          {...currentBlockPostNotificationsData}
          mainBtnClassName="bg-light-primary hover:bg-light-primary/90 active:bg-light-primary/80 dark:text-light-primarydark:bg-light-border dark:hover:bg-light-border/90 dark:active:bg-light-border/75"
          action={handleBlockNotifications}
          closeModal={allowNotiCloseModal}
        />
      </Modal>
    </>
  );
};

export default PostOptions;
