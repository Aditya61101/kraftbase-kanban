import { useState } from 'react'
import { Task, useTaskStore } from '@/store/board';
import { useModal } from '@/store/modal';
import { Dot, Check, Pencil, Trash2 } from 'lucide-react';
// import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ title, desc, sub_tasks, labels, task_id, cat_id, board_id }: Task) => {
    const task = {
        task_id,
        title,
        desc,
        sub_tasks,
        labels,
        cat_id,
        board_id
    }
    const [clicked, setClicked] = useState<boolean[]>([false]);
    const { openModal } = useModal();
    const { deleteTask } = useTaskStore();
    return (
        <div className='bg-white border-[#ddd] border-2 shadow-sm rounded-lg p-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='font-semibold text-lg'>{title}</p>
                    <p className='text-[#5a5a65] text-sm mt-[-5px]'>{desc}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                    <Pencil className='cursor-pointer' size={16} onClick={() => openModal("edit-task", "", task)} />
                    <Trash2 className='cursor-pointer' size={16} onClick={() => deleteTask(task_id)}/>
                </div>
            </div>
            <div className='flex flex-col gap-y-1 mt-3'>
                {sub_tasks?.map((sub_task, i) => (
                    <div className='flex items-center' key={i}>
                        <div onClick={() => {
                            const temp = [...clicked];
                            temp[i] = !temp[i];
                            setClicked(temp);
                        }} className=' bg-[#e1e4e8] rounded-md cursor-pointer'>
                            {!clicked[i] ? <Dot size={16} color='#5a5a65' /> : <Check size={16} color='#5a5a65' />}
                        </div>
                        <p className={`${clicked[i] ? "line-through text-[#949494]" : "text-[#5a5a65]"} text-sm ml-2`}>{sub_task}</p>
                    </div>
                ))}
                <div className='flex flex-wrap gap-x-1 mt-3'>
                    {labels?.map((label) => (
                        <div className='rounded-md px-2 py-1' style={{ backgroundColor: label.color }}>
                            <p className='text-sm font-medium'>{label.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskCard;