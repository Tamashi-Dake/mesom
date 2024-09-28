import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogPanel } from "@headlessui/react";
import cn from "clsx";

import { backdropVariant, modalVariant } from "../shared/config";

export const Modal = ({
  open,
  children,
  className,
  modalAnimation,
  modalClassName,
  closePanelOnClick,
  closeModal,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          className="relative z-50"
          open={open}
          onClose={closeModal}
          static
        >
          <motion.div
            className="hover-animation fixed inset-0 bg-black/40 dark:bg-[#5B7083]/40"
            aria-hidden="true"
            {...backdropVariant}
          />
          <div
            className={cn(
              "fixed inset-0 overflow-y-auto p-4",
              className ?? "flex items-center justify-center"
            )}
          >
            <DialogPanel
              className={modalClassName}
              as={motion.div}
              {...(modalAnimation ?? modalVariant)}
              onClick={closePanelOnClick ? closeModal : undefined}
            >
              {children}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
