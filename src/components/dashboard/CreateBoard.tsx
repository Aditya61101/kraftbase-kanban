import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { optional, z } from "zod"

import { nanoid } from 'nanoid'
import { useModal } from "@/store/modal";
import { useBoardStore, useCategoryStore } from "@/store/board";
import { useAuthStore } from "@/store/auth";

const formSchema = z.object({
    title: z.string().min(6, {
        message: "Title must be at least 6 characters.",
    }),
    description: optional(z.string()),
})
const CreateBoard = () => {
    const { isOpen, closeModal } = useModal();
    const { email } = useAuthStore();
    const { addBoard } = useBoardStore();
    const { addCategory } = useCategoryStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        const board = {
            board_id: nanoid(),
            email_id: email as string,
            title: values.title,
            desc: values.description
        }
        addBoard(board);

        const todo = {
            cat_id: nanoid(),
            board_id: board.board_id,
            name: 'Not started',
            color: "#e1e4e8",
            tasks:[]
        }
        const inProgress = {
            cat_id: nanoid(),
            board_id: board.board_id,
            name: 'In Progress',
            color: "#f0e7f6",
            tasks:[]
        }
        const blocked = {
            cat_id: nanoid(),
            board_id: board.board_id,
            name: 'Blocked',
            color: "#ffdce0",
            tasks:[]
        }
        const done = {
            cat_id: nanoid(),
            board_id: board.board_id,
            name: 'Done',
            color: "#cbdfd8",
            tasks:[]
        }
        addCategory(todo);
        addCategory(inProgress);
        addCategory(blocked);
        addCategory(done);

        form.reset();
        closeModal();
        toast({
            title:"Board Created",
            variant:"success"
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">Create Board</DialogTitle>
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
                        <Button className="w-full" type="submit" variant="default">
                            Create
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBoard;