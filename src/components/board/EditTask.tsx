import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { optional, z } from "zod"

import { X } from "lucide-react";
import { useModal } from "@/store/modal";
import { useCategoryStore } from "@/store/board";
import { useParams } from "react-router-dom";
import { labelColorsArr } from "@/constant";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: optional(z.string()),
    subTasks: z.array(z.string().min(3,{
        message: "Sub-task must be at least 3 characters.",
    })).optional(),
    label: z.string().optional(),
    labelColor: z.string().optional(),
})

const EditTask = () => {
    const { boardID } = useParams();

    const [subTasksInput, setSubTasksInput] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [labelColors, setLabelColors] = useState<string[]>([]);

    const { isOpen, closeModal, task } = useModal();
    const { updateTask } = useCategoryStore();

    useEffect(() => {
        if (task?.sub_tasks) {
            setSubTasksInput(task.sub_tasks);
        }
        if (task?.labels) {
            setLabels(task.labels.map((label) => label.name));
            setLabelColors(task.labels.map((label) => label.color));
        }
    }, [task]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: task?.title??"",
            description: task?.desc??"",
            subTasks: task?.sub_tasks??[],
            label: "",
            labelColor: "",
        },
    })

    const handleAddLabel = () => {
        setLabels([...labels, form.getValues('label') ?? '']);
        setLabelColors([...labelColors, form.getValues('labelColor') ?? '']);
        form.setValue('label', '');
        form.setValue('labelColor', '');
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        const updatedTask = {
            task_id: task?.task_id as string,
            cat_id: task?.cat_id as string,
            board_id: boardID as string,
            title: values.title,
            desc: values.description,
            sub_tasks: values?.subTasks,
            labels: labels?.map((label, index) => ({ name: label, color: labelColors[index] }))
        }
        console.log(updatedTask);
        updateTask(updatedTask);
        form.reset();
        closeModal();
        toast({
            title:"Task updated",
            variant:"success"
        });
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            <DialogContent className="sm:max-w-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">Edit Task</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title of the board" {...field} type='text'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter the board description" {...field} type='text' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            subTasksInput?.map((_, index) => (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={`subTasks.${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sub-task {index + 1}</FormLabel>
                                            <div className="flex gap-x-1 items-center">
                                                <FormControl>
                                                    <Input placeholder={`Enter the sub-task ${index + 1}`} {...field} type='text' />
                                                </FormControl>
                                                <X className="cursor-pointer" onClick={() => setSubTasksInput(subTasksInput.filter((_, i) => i !== index))} />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))
                        }
                        <Button type="button" className="w-full bg-[#635fc7] text-white" onClick={() => setSubTasksInput([...subTasksInput, ''])}>
                            + Add a sub-task
                        </Button>
                        <p className="font-semibold text-sm">Add Label</p>
                        <div className="flex gap-x-2 !mt-[2px]">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Enter the Label" {...field} type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="labelColor"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a label color" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {labelColorsArr.map((obj) => (
                                                    <SelectItem value={obj.hex}>{obj.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant="outline" className="text-[#635fc7]" onClick={handleAddLabel} type="button">
                                Add Label
                            </Button>
                        </div>
                        {labels.length>0 && <div className="flex flex-wrap items-center gap-x-1">
                            <p className="font-semibold text-sm">Labels:</p>
                            {labels?.map((label, index) => (
                                <div key={index} className="flex gap-x-1 items-center rounded-md px-2 py-1" style={{ backgroundColor: labelColors[index] }}>
                                    <p className="text-sm font-medium">{label}</p>
                                    <X className="cursor-pointer mt-[2px]" size={14} onClick={() => {
                                        setLabels(labels.filter((_, i) => i !== index));
                                        setLabelColors(labelColors.filter((_, i) => i !== index));
                                    }}/>
                                </div>
                            ))}
                        </div>}
                        <Button className="w-full" type="submit" variant="default">
                            Edit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditTask;