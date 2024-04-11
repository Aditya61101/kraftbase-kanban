import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CirclePlus, Trash2 } from 'lucide-react';
import { Category, useBoardStore, useCategoryStore, useSearchText } from "@/store/board";
import { useModal } from "@/store/modal";
import TaskCard from "@/components/board/TaskCard";
import Droppable from "@/components/board/StrictModeDroppable";
import { Button } from "@/components/ui/button";
import { DragDropContext, DroppableProvided, DropResult } from "react-beautiful-dnd";

const BoardPage = () => {
    const { boardID } = useParams();
    const navigate = useNavigate();
    const { boards } = useBoardStore();
    const { categories, deleteCategory, setTasks } = useCategoryStore();
    const { openModal } = useModal();
    const { searchText } = useSearchText();

    useEffect(() => {
        if (!boards.some((board) => board.board_id === boardID))
            navigate("/boards");
    }, [boardID, navigate, boards]);

    const [notFound, setNotFound] = useState(false);

    const boardTasks = useMemo(() => {
        const tasksArray = Object.values(categories)
            .flatMap((category) => category?.tasks)
            .filter((task) => task?.board_id === boardID);
        return tasksArray;
    }, [boardID, categories]);

    const board = useMemo(() => boards.find((board) => board.board_id === boardID), [boardID, boards]);
    const cats = useMemo(() => {
        return Object.values(categories).filter(cat => cat.board_id === boardID);
    }, [boardID, categories]);

    //function to handle drag drop of the task
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceCatID = source.droppableId;
        const destCatID = destination.droppableId;

        const draggedTask = categories[sourceCatID].tasks[source.index];
        draggedTask.cat_id = destCatID;

        categories[sourceCatID].tasks.splice(source.index, 1);
        setTasks(categories[sourceCatID].tasks, sourceCatID);

        categories[destCatID].tasks.splice(destination.index, 0, draggedTask);
        setTasks(categories[destCatID].tasks, destCatID);
    }

    // for displaying proper message if task is not found w.r.t searchText or no task is available
    let content = null;
    if (boardTasks.length === 0) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Create tasks by clicking on the plus button next to each category!</p> </div>
    } else if (notFound) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Try searching for something else!</p> </div>
    }

    function renderTasks(cat: Category) {
        if (searchText === "") {
            return cat.tasks?.map((task, index) =>
                <TaskCard id={index} key={task?.task_id} {...task} />
            )
        }
        //if the searchText is not empty, then we filter the tasks based on the searchText
        const filteredArr = cat.tasks?.filter((task) => task.title.toLowerCase().includes(searchText.toLowerCase()) || task?.labels?.some((label) => label.name.toLowerCase().includes(searchText.toLowerCase())));
        if (filteredArr.length === 0){
            setNotFound(true);
            return;
        }
        return filteredArr.map((task, index) =>
            <TaskCard id={index} key={task?.task_id} {...task} />
        )
    }
    return (
        <div className="h-full px-5 pt-7">
            <div className="flex items-center justify-between">
                <div className="break-all overflow-wrap">
                    <p className="font-bold text-xl lg:text-3xl">{board?.title}</p>
                    <p className=" text-[#5a5a65] mt-1">{board?.desc}</p>
                </div>
                <Button className='block lg:hidden' size={"sm"} variant="outline" onClick={() => openModal("category", "", null)}>Add Category</Button>
            </div>
            <div className="bg-[#f8f8f8] rounded-xl p-5 mt-7">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid lg:grid-cols-4 gap-y-4 gap-x-7">
                        {cats.map((cat) => {
                            return (
                                <Droppable droppableId={cat.cat_id}>
                                    {(provided: DroppableProvided) => <div key={cat.cat_id} {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        <div className="flex items-center gap-x-2 rounded-3xl px-3 py-[2px] text-center w-fit" style={{ backgroundColor: cat.color }}>
                                            <p className="font-semibold text-[#434445] text-sm">{cat.name}</p>
                                            <CirclePlus size={15} onClick={() => openModal("create-task", cat.cat_id, null)} className="cursor-pointer mt-[2px]" />
                                            <Trash2 size={15} onClick={() => deleteCategory(cat.cat_id)} className="cursor-pointer mt-[2px]" />
                                        </div>
                                        <div className="flex flex-col gap-y-3 mt-4">
                                            {renderTasks(cat)}
                                        </div>
                                        {provided.placeholder}
                                    </div>}
                                </Droppable>
                            )
                        })}
                    </div>
                </DragDropContext>
                {content}
            </div>
        </div>
    )
}

export default BoardPage;