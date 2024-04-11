import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
//form utilities
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
//components
import { Button } from "@/components/ui/button"
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { toast } from "@/components/ui/use-toast"
import { useAuthStore } from "@/store/auth"

const formSchema = z.object({
      email: z.string().email({
            message: "Please enter a valid email address.",
      }),
      password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
      }),
})
const Login = () => {
      const navigate = useNavigate();
      const { email, setEmail } = useAuthStore();
      useEffect(() => {
            if (email) navigate("/boards");
      }, [email, navigate])

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  email: "",
                  password: "",
            },
      })
      function onSubmit(values: z.infer<typeof formSchema>) {
            setEmail(values.email);
            toast({
                  variant: "success",
                  title: "Logged in successfully"
            })
            navigate("/boards");
      }
      return (
            <div className='bg-[#f8f8f8] h-screen w-screen flex items-center justify-center'>
                  <div className='bg-white border-2 border-[#dddddd] rounded-lg shadow-md p-7'>
                        <p className='text-2xl font-semibold mb-3'>Login to Kraftbase Kanban</p>
                        <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Email</FormLabel>
                                                      <FormControl>
                                                            <Input placeholder="Enter your email" {...field} type='email' />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="password"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Password</FormLabel>
                                                      <FormControl>
                                                            <Input placeholder="Enter your password" {...field} type='password' />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <Button className="w-full" type="submit">Login</Button>
                              </form>
                        </Form>
                  </div>
            </div>
      )
}

export default Login;