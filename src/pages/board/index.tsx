import { Task, useBoardStore, useCategoryStore, useSearchText, useTaskStore } from "@/store/board";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CirclePlus, Trash2 } from 'lucide-react';
import { useModal } from "@/store/modal";
import TaskCard from "@/components/board/TaskCard";

const BoardPage = () => {
    const { boardID } = useParams();
    const { boards } = useBoardStore();
    const { categories, deleteCategory } = useCategoryStore();
    const { openModal } = useModal();
    const { tasks } = useTaskStore();
    const { searchText } = useSearchText();

    const boardTasks = useMemo(() => tasks.filter((task) => task.board_id === boardID), [boardID, tasks]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (searchText === "") {
            setFilteredTasks(boardTasks);
            return;
        }
        const filtered = boardTasks.filter((task) => task.title.toLowerCase().includes(searchText.toLowerCase()) || task?.labels?.some((label) => label.name.toLowerCase().includes(searchText.toLowerCase())));
        setFilteredTasks(filtered);
    }, [boardTasks, searchText]);

    const board = useMemo(() => boards.find((board) => board.board_id === boardID), [boardID, boards]);
    const cats = useMemo(() => categories.filter((cat) => cat.board_id === boardID), [boardID, categories]);

    let content = null;
    if (boardTasks.length === 0) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Create tasks by clicking on the plus button next to each category!</p> </div>
    } else if (filteredTasks.length === 0) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Try searching for something else!</p> </div>
    }
    return (
        <div className="h-full px-5 pt-7">
            <p className="font-bold text-3xl">{board?.title}</p>
            <p className="font-normal  text-[#5a5a65] mt-1">{board?.desc}</p>
            <div className="bg-[#f8f8f8] rounded-xl p-5 mt-7">
                <div className="grid lg:grid-cols-4 gap-y-4 gap-x-7">
                    {cats.map((cat) => {
                        const catTasks = filteredTasks?.filter((task) => task.cat_id === cat.cat_id)
                        return (<div key={cat.cat_id}>
                            <div className="flex items-center gap-x-2 rounded-3xl px-3 py-[2px] text-center w-fit" style={{ backgroundColor: cat.color }}>
                                <p className="font-semibold text-[#434445] text-sm">{cat.name}</p>
                                <CirclePlus size={15} onClick={() => openModal("create-task", cat.cat_id, null)} className="cursor-pointer mt-[2px]" />
                                <Trash2 size={15} onClick={() => deleteCategory(cat.cat_id)} className="cursor-pointer mt-[2px]" />
                            </div>
                            <div className="flex flex-col gap-y-3 mt-4">
                                {catTasks?.map(task =>
                                    <TaskCard key={task.task_id} {...task} />
                                )}
                            </div>
                        </div>)
                    })}
                </div>
                {content}
            </div>
        </div>
    )
}

export default BoardPage;