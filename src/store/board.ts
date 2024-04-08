import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./auth";

export type Board = {
    board_id: string;
    title: string;
    desc?: string;
};
export type Category = {
    cat_id: string;
    board_id: string;
    name: string;
    color: string;
}
export type Label = {
    name: string;
    color: string;
}
export type Task = {
    task_id: string;
    cat_id: string;
    title: string;
    desc: string;
    sub_tasks: string[];
    labels: Label[];
}

interface BoardStore {
    email: string | null;
    boards: Board[];
    categories: Category[];
    tasks: Task[];
    setBoards: (boards: Board[]) => void;
    setCategories: (categories: Category[]) => void;
    setTasks: (tasks: Task[]) => void;
    addBoard: (board: Board) => void;
    addCategory: (category: Category) => void;
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (task_id: string) => void;
    deleteCategory: (cat_id: string) => void;
    deleteBoard: (board_id: string) => void;
}

export const useBoardStore = create<BoardStore>()(
    persist(
        (set) => ({
            email: useAuthStore.getState().email,
            boards: [],
            categories: [],
            tasks: [],
            setBoards: (boards) => set({ boards }),
            addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
            deleteBoard: (board_id) => set((state) => ({ boards: state.boards.filter((b) => b.board_id !== board_id) })),
            setCategories: (categories) => set({ categories }),
            addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
            deleteCategory: (cat_id) => set((state) => ({ categories: state.categories.filter((c) => c.cat_id !== cat_id) })),
            setTasks: (tasks) => set({ tasks }),
            addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
            updateTask: (task) => set((state) => ({ tasks: state.tasks.map((t) => t.task_id === task.task_id ? task : t) })),
            deleteTask: (task_id) => set((state) => ({ tasks: state.tasks.filter((t) => t.task_id !== task_id) }))
        }),
        { name: "board-storage" }
    ),
);

// interface BoardStore {
//     boards: Board[];
//     setBoards: (boards: Board[]) => void;
//     addBoard: (board: Board) => void;
//     deleteBoard: (board_id: string) => void;
// }
// export const useBoardStore = create<BoardStore>()(
//     persist(
//         (set) => ({
//             boards: [],
//             setBoards: (boards) => set({ boards }),
//             addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
//             deleteBoard: (board_id) => set((state) => ({ boards: state.boards.filter((b) => b.board_id !== board_id) })),
//         }),
//         { name: "board-storage" }
//     )
// )
// interface CategoryStore {
//     categories: Category[];
//     setCategories: (categories: Category[]) => void;
//     addCategory: (category: Category) => void;
//     deleteCategory: (cat_id: string) => void;
// }
// export const useCategoryStore = create<CategoryStore>()(
//     persist(
//         (set) => ({
//             categories: [],
//             setCategories: (categories) => set({ categories }),
//             addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
//             deleteCategory: (cat_id) => set((state) => ({ categories: state.categories.filter((c) => c.cat_id !== cat_id) })),
//         }),
//         { name: "category-storage" }
//     )
// )

// interface TaskStore {
//     tasks: Task[];
//     setTasks: (tasks: Task[]) => void;
//     addTask: (task: Task) => void;
//     updateTask: (task: Task) => void;
//     deleteTask: (task_id: string) => void;
// }
// export const useTaskStore = create<TaskStore>()(
//     persist(
//         (set) => ({
//             tasks: [],
//             setTasks: (tasks) => set({ tasks }),
//             addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
//             updateTask: (task) => set((state) => ({ tasks: state.tasks.map((t) => t.task_id === task.task_id ? task : t) })),
//             deleteTask: (task_id) => set((state) => ({ tasks: state.tasks.filter((t) => t.task_id !== task_id) })),
//         }),
//         { name: "task-storage" }
//     )
// );