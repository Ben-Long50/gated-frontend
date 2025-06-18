import { create } from 'zustand';

const useNavigationStore = create<{
  navbar: boolean;
  sidebar: boolean;
  navbarHeight: number;
  setNavbar: (state: boolean) => void;
  setSidebar: (state: boolean) => void;
  setNavbarHeight: (height: number) => void;
  closeBars: () => void;
}>((set) => ({
  navbar: false,
  sidebar: false,
  navbarHeight: 0,
  setNavbar: (state) => set({ navbar: state }),
  setSidebar: (state) => set({ sidebar: state }),
  setNavbarHeight: (height) => set({ navbarHeight: height }),
  closeBars: () => set({ navbar: false, sidebar: false }),
}));

export default useNavigationStore;
