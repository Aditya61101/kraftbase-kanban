import { create } from "zustand";

export type ModalType = "board" | "task" | "category";
interface ModalStore {
    type: ModalType | null;
    cat_id?: string|null;
    isOpen: boolean;
    openModal: (type: ModalType, cat_id:string) => void;
    closeModal: () => void;
}
export const useModal = create<ModalStore>((set) => ({
    isOpen: false,
    type: null,
    cat_id: null,
    openModal: (type:ModalType, cat_id:string) => set({ isOpen: true, type, cat_id}),
    closeModal: () => set({ type: null, isOpen: false })
}));