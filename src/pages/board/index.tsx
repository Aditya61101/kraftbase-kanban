import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';
import { Task, useBoardStore, useCategoryStore, useSearchText } from "@/store/board";
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

    // check if the board exists
    useEffect(() => {
        console.log(boards[boardID as string]);
        if (boardID === undefined || !boards[boardID]) navigate("/boards");
    }, [boardID, navigate, boards]);

    const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);

    // get all the categories of the board
    const cats = useMemo(() => {
        return Object.values(categories).filter(cat => cat.board_id === boardID);
    }, [boardID, categories]);

    // get all the tasks of the board
    const boardTasks = useMemo(() => {
        const tasksArray = Object.values(categories)
            .flatMap((category) => category?.tasks)
            .filter((task) => task?.board_id === boardID);
        return tasksArray;
    }, [boardID, categories]);

    //filter the tasks based on the search text
    useEffect(() => {
        const filteredArr = boardTasks.filter((task) =>
            task.title.toLowerCase().includes(searchText.toLowerCase()) ||
            task.labels?.some((label) => label.name.toLowerCase().includes(searchText.toLowerCase()))
        );
        setSearchedTasks(filteredArr);
    }, [searchText, boardTasks]);

    //function to handle drag and drop of tasks
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceCatID = source.droppableId;
        const destCatID = destination.droppableId;

        // get the task that is being dragged and update its cat_id with the destination category id
        const draggedTask = categories[sourceCatID].tasks[source.index];
        draggedTask.cat_id = destCatID;

        // remove the task from source category
        categories[sourceCatID].tasks.splice(source.index, 1);
        setTasks(categories[sourceCatID].tasks, sourceCatID);

        //add it to the destination category
        categories[destCatID].tasks.splice(destination.index, 0, draggedTask);
        setTasks(categories[destCatID].tasks, destCatID);
    }

    // for displaying proper message if task is not found w.r.t searchText or no task is available
    let content = null;
    if (boardTasks.length === 0) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Create tasks by clicking on the plus button next to each category!</p> </div>
    } else if (searchedTasks.length === 0) {
        content = <div className="text-center mt-7"><p className="font-semibold text-lg">No tasks found</p> <p>Try searching for something else!</p> </div>
    }

    return (
        <div className="h-full px-5 pt-7">
            <div className="flex items-center justify-between">
                <div className="break-all overflow-wrap">
                    <p className="font-bold text-xl lg:text-3xl">{boards[boardID as string].title}</p>
                    <p className=" text-[#5a5a65] mt-1">{boards[boardID as string].desc}</p>
                </div>
                <Button className='block lg:hidden' size={"sm"} variant="outline" onClick={() => openModal("category", "", null)}>Add Category</Button>
            </div>
            <div className="bg-[#f8f8f8] rounded-xl p-5 mt-7">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid lg:grid-cols-4 gap-y-4 gap-x-7">
                        {cats.map((cat) => {
                            return (
                                <Droppable key={cat.cat_id} droppableId={cat.cat_id}>
                                    {(provided: DroppableProvided) => <div {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        <div className="flex items-center gap-x-2 rounded-3xl px-3 py-[2px] text-center w-fit" style={{ backgroundColor: cat.color }}>
                                            <p className="font-semibold text-[#434445] text-sm">{cat.name}</p>
                                            <CirclePlus size={15} onClick={() => openModal("create-task", cat.cat_id, null)} className="cursor-pointer mt-[2px]" />
                                            <Pencil size={15} onClick={() => openModal("edit-category", cat.cat_id, null)} className="cursor-pointer mt-[2px]" />
                                            <Trash2 size={15} onClick={() => deleteCategory(cat.cat_id)} className="cursor-pointer mt-[2px]" />
                                        </div>
                                        <div className="flex flex-col gap-y-3 mt-4">
                                            {
                                                searchedTasks.filter((task) => task.cat_id === cat.cat_id).map((task, index) => (
                                                    <TaskCard id={index} key={task.task_id} {...task} />
                                                ))
                                            }
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