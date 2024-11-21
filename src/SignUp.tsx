import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { Link,  useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/AuthContext"
import { addUser } from "@/lib/appwrite/databaseActions"
import { IUser } from "@/types"
import { ID } from "appwrite"

const isStrongPassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};


const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  masterPassword: z.string().refine(isStrongPassword, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  // }),
  // confirmPassword: z.string().refine(isPasswordMatching, {
  //   message: "Passwords do not match",
 })
})

const SignUp = () => {
  const navigate = useNavigate()
  const {user} = useAuth()
  const registerForm = useRef<HTMLFormElement>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      masterPassword: "",
      // confirmPassword: "",
    }
  })
  const {createUserAccount} = useAuth()
  useEffect(() => {
    if(user){
      navigate("/dashboard")
    }
  },[])
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(registerForm.current){
      const username = registerForm.current.username.value
      const email = registerForm.current.email.value
      const masterPassword = registerForm.current.masterPassword.value
      const userInfo = { username, email, masterPassword };
      await createUserAccount(userInfo)

    }
  }
  const [showMasterPassword , setShowMasterPassword] = useState(false);
  return (
    <>
      <div className="flex flex-col w-60 md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl mt-10">
        <Form {...form}>
        <form className="space-y-6" onSubmit={handleSubmit} ref={registerForm}>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
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
          <div className="flex flex-row">Already have an account? <div className="text-blue-500 ml-1"><Link to="/sign-in" >Sign In</Link></div></div>
          <Button type="submit" className="w-full bg-blue-500">Create an account</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default SignUp