import { useBoardStore, useCategoryStore, useTaskStore } from "@/store/board";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { CirclePlus, Trash2 } from 'lucide-react';
import { useModal } from "@/store/modal";

const BoardPage = () => {
    const { boardID } = useParams();
    const { boards } = useBoardStore();
    const { categories, deleteCategory } = useCategoryStore();
    const { openModal } = useModal();
    const { tasks } = useTaskStore();

    const board = useMemo(() => boards.find((board) => board.board_id === boardID), [boardID, boards]);
    const cats = useMemo(() => categories.filter((cat) => cat.board_id === boardID), [boardID, categories]);

    return (
        <div className=" h-full px-5 pt-7">
            <p className="font-bold text-3xl">{board?.title}</p>
            <p className="font-normal  text-[#5a5a65] mt-1">{board?.desc}</p>
            <div className="bg-[#f8f8f8] rounded-xl p-2 mt-7 grid lg:grid-cols-4 gap-y-4 gap-x-7">
                {cats.map((cat) => {
                    const catTasks = tasks.filter((task) => task.cat_id === cat.cat_id)
                    return (<div key={cat.cat_id} style={{ backgroundColor: cat.color }} className="rounded-3xl px-3 py-[2px] text-center w-fit">
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold text-[#434445] text-sm">{cat.name}</p>
                            <CirclePlus size={15} onClick={() => openModal("task",cat.cat_id)} className="cursor-pointer mt-[2px]" />
                            <Trash2 size={15} onClick={() => deleteCategory(cat.cat_id)} className="cursor-pointer mt-[2px]" />
                        </div>
                        <div className="flex flex-col gap-y-3">

                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default BoardPage;