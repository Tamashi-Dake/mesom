import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import cn from "clsx";
import { Modal } from "../modal/Modal";
import DisplayModal from "../modal/DisplayModal";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiCog } from "react-icons/bi";
import { GrCircleInformation } from "react-icons/gr";
import { MdDisplaySettings } from "react-icons/md";
import { useModal } from "../../hooks/useModal";

const variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.4 },
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};

const DisplaySettings = () => {
  const displayModal = useModal();

  return (
    <>
      <Modal
        className="flex items-start justify-center"
        modalClassName="bg-white relative rounded-2xl max-w-xl w-full my-8 overflow-hidden"
        open={displayModal.open}
        closeModal={displayModal.closeModal}
      >
        <DisplayModal closeModal={displayModal.closeModal} />
      </Modal>
      {/* TODO: relative bị nằm dưới các relative trong page content, cần check lại index/thứ tự */}
      <Menu className="relative" as="div">
        {({ open }) => (
          <>
            <MenuButton className="group relative flex w-full outline-none">
              <div
                className={cn(
                  `custom-button flex w-full items-center justify-center gap-4 text-xl transition group-hover:bg-light-primary/10 group-focus-visible:ring-2 group-focus-visible:ring-[#878a8c] xl:justify-start xl:px-4 dark:group-hover:bg-dark-primary/10 dark:group-focus-visible:ring-white`,
                  open && "bg-light-primary/10 dark:bg-dark-primary/10",
                )}
              >
                <CiCircleMore size={24} color="black" />
                <p className="hidden xl:block">More</p>
              </div>
            </MenuButton>
            <AnimatePresence>
              {open && (
                <MenuItems
                  anchor="top"
                  className="menu-container absolute -top-44 w-60 bg-white font-medium"
                  as={motion.div}
                  {...variants}
                  static
                >
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        className={cn(
                          "flex w-full cursor-not-allowed gap-3 rounded-t-md p-4 duration-200",
                          active && "bg-main-sidebar-background",
                        )}
                        href="/settings"
                      >
                        <BiCog size={24} color="black" />
                        Settings and privacy
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        className={cn(
                          "flex w-full cursor-not-allowed gap-3 rounded-t-md p-4 duration-200",
                          active && "bg-main-sidebar-background",
                        )}
                        href="/about"
                      >
                        <GrCircleInformation size={24} color="black" />
                        Help center
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={displayModal.openModal}
                      className="flex cursor-pointer items-center justify-start gap-4 rounded-2xl px-4 py-2"
                    >
                      <MdDisplaySettings size={24} color="black" />
                      <p className="pb-[0.1rem] text-xl">Display</p>
                    </Button>
                  </MenuItem>
                </MenuItems>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
};

export default DisplaySettings;
