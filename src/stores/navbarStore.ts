import { create } from 'zustand';

const useNavigationStore = create<{
  navbar: boolean;
  sidebar: boolean;
  setNavbar: (state: boolean) => void;
  setSidebar: (state: boolean) => void;
  closeBars: () => void;
}>((set) => ({
  navbar: false,
  sidebar: false,
  setNavbar: (state) => set({ navbar: state }),
  setSidebar: (state) => set({ sidebar: state }),
  closeBars: () => set({ navbar: false, sidebar: false }),
}));

export default useNavigationStore;
