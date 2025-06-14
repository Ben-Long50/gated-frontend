import { create } from 'zustand';

type menuTypes =
  | ''
  | 'character'
  | 'item'
  | 'profit'
  | 'affiliation'
  | 'condition'
  | 'action';
type menuSizes = '' | 'small' | 'medium' | 'large';

const useRadialMenuStore = create<{
  menuOpen: boolean;
  menuId: number | null;
  menuType: menuTypes;
  menuSize: menuSizes;
  coordinates: { x: number; y: number };
  setMenuOpen: (state: boolean) => void;
  setMenu: (type: menuTypes, size: menuSizes, id?: number | null) => void;
  setCoordinates: (x: number, y: number) => void;
}>((set) => ({
  menuOpen: false,
  menuId: null,
  menuType: '',
  menuSize: '',
  coordinates: { x: 0, y: 0 },
  setMenuOpen: (state) => set({ menuOpen: state }),
  setMenu: (type, size, id) =>
    set({ menuType: type, menuSize: size, menuId: id }),
  setCoordinates: (x, y) => set({ coordinates: { x: x, y: y } }),
}));

export default useRadialMenuStore;
