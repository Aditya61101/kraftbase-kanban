import { create } from "zustand";

export type ModalType = "board" | "task";
interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}
export const useModal = create<ModalStore>((set) => ({
    isOpen: false,
    type: null,
    openModal: (type) => set({ isOpen: true, type }),
    closeModal: () => set({ type: null, isOpen: false })
}));