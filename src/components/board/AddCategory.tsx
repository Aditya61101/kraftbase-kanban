import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useModal } from "@/store/modal";
import { useCategoryStore } from "@/store/board";
import { nanoid } from 'nanoid'
import { colors } from "@/constant";

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Category name must be of at least 3 characters.",
    }),
})
const AddCategory = () => {
    const [color, setColor] = useState(0);
    const { isOpen, closeModal } = useModal();
    const { boardID } = useParams();
    const { addCategory } = useCategoryStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        const category = {
            cat_id: nanoid(),
            board_id: boardID as string,
            name: values.name,
            color: colors[color],
            tasks: []
        }
        addCategory(category);

        form.reset();
        closeModal();
        toast({
            title:"Category Added",
            variant:"success"
        });
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">Add Category</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name of the category" {...field} type='text' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex">
                            <p>Color:</p>
                            <div className="flex gap-x-2 ml-2">
                                {colors.map((c, i) => (
                                    <div key={i} className={`rounded-full cursor-pointer h-6 w-6`} style={{
                                        border: color === i ? "3px solid #383838" : "none",
                                        outline: `2px solid ${c}`,
                                        backgroundColor: c
                                    }} onClick={() => setColor(i)} />
                                ))}
                            </div>
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

export default AddCategory;