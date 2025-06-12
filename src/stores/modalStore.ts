import { create } from 'zustand';

const useModalStore = create<{
  backgroundPath: string | null;
  setBackgroundPath: (path: string | null) => void;
}>((set) => ({
  backgroundPath: null,
  setBackgroundPath: (path) => set({ backgroundPath: path }),
}));

export default useModalStore;
