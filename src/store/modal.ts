import { create } from "zustand";
import { Task } from "./board";

export type ModalType = "board" | "create-task" | "edit-task" | "category"| "edit-category";
interface ModalStore {
    type: ModalType | null;
    cat_id?: string|null;
    task?: Task|null;
    isOpen: boolean;
    openModal: (type: ModalType, cat_id:string, task:Task|null) => void;
    closeModal: () => void;
}
export const useModal = create<ModalStore>((set) => ({
    isOpen: false,
    type: null,
    cat_id: null,
    task: null,
    openModal: (type:ModalType, cat_id:string="", task:Task|null=null) => set({ isOpen: true, type, cat_id, task}),
    closeModal: () => set({ type: null, isOpen: false })
}));