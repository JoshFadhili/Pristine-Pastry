import { z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { account } from "../lib/appwrite/config"
import { useAuth } from "@/lib/AuthContext"
import { LogIn } from "lucide-react"

const formSchema = z.object({
    email: z.string(),
    masterPassword: z.string(),
})
const SignIn = () => {
  const [showMasterPassword, setShowMasterPassword]= useState(false)
  const Navigate = useNavigate()
  const {user, loginUser}= useAuth()
 // const [loadingUser, setLoadingUser] = useState(true)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      masterPassword: "",
    }
  })
  const loginForm = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if(user){
      Navigate("/dashboard")
    }
  },[])

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if (loginForm.current) {
      const email = loginForm.current.email.value;
      const masterPassword = loginForm.current.masterPassword.value;
      const userInfo = { email, masterPassword };
      loginUser(userInfo);
    }
  }

  
  return (
    <>
			<div className="flex flex-col w-60 md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl mt-10">
        <Form {...form}>
        <form className="space-y-6" onSubmit={handleSubmit} ref={loginForm}>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl >
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="masterPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Master password</FormLabel>
                <FormControl>
									<div className="flex flex-grid-2">
                  	<Input type={showMasterPassword ? "text" : "password"} placeholder="Master password" {...field} />
										<button type="button" onClick={() => setShowMasterPassword(!showMasterPassword)} className="ml-1">{showMasterPassword ? "Hide" : "Show"}</button>
									</div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row">Don't have an account? <div className="text-blue-500 ml-1"><Link to="/sign-up">Sign Up</Link></div></div>
          <Button type="submit" className="w-full bg-blue-500">Sign In</Button>
          </form>
        </Form>
    </div>
    </>
  )
}

export default SignIn