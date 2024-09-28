import { useState } from "react";
import { create } from "zustand";

const toggleModal = () => {
  return create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};

const usePostModal = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { open, openModal, closeModal };
};

const useAuthModal = toggleModal();
const useSubscribeModal = toggleModal();
const useAdModal = toggleModal();

export { useAuthModal, useSubscribeModal, useAdModal, usePostModal };
