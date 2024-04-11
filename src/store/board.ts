import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Board = {
    board_id: string;
    email_id: string;
    title: string;
    desc?: string;
};

export type Label = {
    name: string;
    color: string;
}
export type Task = {
    task_id: string;
    cat_id: string;
    board_id:string;
    title: string;
    desc?: string;
    sub_tasks?: string[];
    labels?: Label[];
}
export type Category = {
    cat_id: string;
    board_id: string;
    name: string;
    color: string;
    tasks:Task[];
}

interface BoardStore {
    boards: Board[];
    setBoards: (boards: Board[]) => void;
    addBoard: (board: Board) => void;
    deleteBoard: (board_id: string) => void;
}
export const useBoardStore = create<BoardStore>()(
    persist(
        (set) => ({
            boards: [],
            setBoards: (boards) => set({ boards }),
            addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
            deleteBoard: (board_id) => set((state) => ({ boards: state.boards.filter((b) => b.board_id !== board_id) })),
        }),
        { name: "board-storage" }
    )
)

interface CategoryStore {
    categories: Record<string, Category>;
    setCategories: (categories: Record<string, Category>) => void;
    addCategory: (category: Category) => void;
    updateCategory: (cat_id:string, name:string) => void;
    deleteCategory: (cat_id: string) => void;
    setTasks: (tasks: Task[], cat_id: string) => void;
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (task_id: string, cat_id:string) => void;
}
export const useCategoryStore = create<CategoryStore>()(
    persist(
        (set) => ({
            categories: {},

            setCategories: (categories) => set({ categories }),
            addCategory: (category) => set((state) => ({
                categories: { ...state.categories, [category.cat_id]: category }
            })),
            updateCategory: (name, cat_id) => set((state) => {
                const category = state.categories[cat_id];
                category.name=name;
                return { categories: { ...state.categories, [cat_id]: category } };
            }),
            deleteCategory: (cat_id) => set((state) => {
                const newCategories = { ...state.categories };
                delete newCategories[cat_id];
                return { categories: newCategories };
            }),

            setTasks: (tasks, cat_id) => set((state) => {
                const category = state.categories[cat_id];
                if (!category) return state;
                category.tasks = tasks;
                return { categories: { ...state.categories, [cat_id]: category } };
            }),
            addTask: (task) => set((state) => {
                const category = state.categories[task.cat_id];
                if (!category) return state;
                category.tasks?.push(task);
                return { categories: { ...state.categories, [task.cat_id]: category } };
            }),
            updateTask: (task) => set((state) => {
                const category = state.categories[task.cat_id];
                if (!category) return state;
                category.tasks = category.tasks?.map((t) => t.task_id === task.task_id ? task : t);
                return { categories: { ...state.categories, [task.cat_id]: category } };
            }),
            deleteTask: (task_id, cat_id) => set((state) => {
                const category = state.categories[cat_id];
                if (!category) return state;
                category.tasks = category.tasks.filter((t) => t.task_id !== task_id);
                return { categories: { ...state.categories, [cat_id]: category } };
            }),
        }),
        { name: "category-storage" }
    )
)

interface SearchStore {
    searchText: string;
    setSearchText: (searchText: string) => void;
}
export const useSearchText = create<SearchStore>((set) => ({
    searchText: "",
    setSearchText: (searchText: string) => set({ searchText }),
}));