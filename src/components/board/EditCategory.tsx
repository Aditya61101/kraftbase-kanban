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

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
})

const EditCategory = () => {
    const { isOpen, closeModal, cat_id } = useModal();
    const { updateCategory, categories } = useCategoryStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: categories[cat_id as string].name
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateCategory(values.title, cat_id as string);
        form.reset();
        closeModal();
        toast({
            title:"Category name updated",
            variant:"success"
        });
    }
    return (
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
            <DialogContent className="sm:max-w-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-bold">Edit Category</DialogTitle>
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
                        <Button className="w-full" type="submit" variant="default">
                            Edit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCategory;