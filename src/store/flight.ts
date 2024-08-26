import {create} from 'zustand';

type ModalState = {
  isAddFlightModalOpen: boolean;

  openAddFlightModal: () => void;
  closeAddFlightModal: () => void;
};

export const useFlightStore = create<ModalState>((set) => ({
  isAddFlightModalOpen: false,
  isOtherModalOpen: false,

  openAddFlightModal: () => set({ isAddFlightModalOpen: true }),
  closeAddFlightModal: () => set({ isAddFlightModalOpen: false }),
}));
