import { create } from "zustand";

const useStore = create((set) => ({
  data: null,
  setData: (newData) => set({ data: newData }),
}));
export default useStore;
