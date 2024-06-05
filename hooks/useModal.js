import { create } from "zustand";

const toggleModalHook = () => {
  return create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};

const useAuthModal = toggleModalHook();

const useSubscribeModal = toggleModalHook();
const useAdModal = toggleModalHook();

export { useAuthModal, useSubscribeModal, useAdModal };
