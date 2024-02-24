import { create } from 'zustand';

interface SideMenuStore {
  isOpen: boolean;
  toggle: () => void;
}

const useSideMenu = create<SideMenuStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSideMenu;
