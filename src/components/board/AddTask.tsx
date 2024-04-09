import { useState } from "react";
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
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { optional, z } from "zod"

import { nanoid } from 'nanoid'
import { useModal } from "@/store/modal";
import { X } from "lucide-react";
import { useTaskStore } from "@/store/board";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: optional(z.string()),
    subTasks: optional(z.array(z.string()).nonempty()),
    label: optional(z.string()),
    labelColor: optional(z.string()),
})

const AddTask = () => {
    const [subTasksInput, setSubTasksInput] = useState<string[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [labelColors, setLabelColors] = useState<string[]>([]);

    const { isOpen, closeModal, cat_id } = useModal();
    const { addTask } = useTaskStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            subTasks: [],
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
        const task = {
            task_id: nanoid(),
            cat_id: cat_id as string,
            title: values.title,
            desc: values.description,
            sub_tasks: values?.subTasks,
            labels: labels?.map((label, index) => ({ name:label, color: labelColors[index] }))
        }
        console.log(task);
        addTask(task);

        form.reset();
        closeModal();
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            <DialogContent className="sm:max-w-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">Add Task</DialogTitle>
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
                                        <Input placeholder="Enter title of the board" {...field} type='text' />
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
                        <Button type="button" className="w-full" variant="outline" onClick={() => setSubTasksInput([...subTasksInput, ''])}>
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
                                        <FormControl>
                                            <Input placeholder="Valid Label color" {...field} type='text' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button onClick={handleAddLabel} type="button" variant="destructive">
                                Add Label
                            </Button>
                        </div>
                        <Button className="w-full" type="submit" variant="default">
                            Add
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask;