import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./lib/AuthContext";
import PhoneNumberInput from "./Components/Phone input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./Components/form";
import { Input } from "./Components/input";

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
  password: z.string().refine(isStrongPassword, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  }),
  contact: z.string(),
});

const SignUp = () => {
  const navigate = useNavigate();
  const registerForm = useRef<HTMLFormElement>(null)
  const { user, createUserAccount } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      contact: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if(registerForm.current){
        const username = registerForm.current.username.value;
        const email = registerForm.current.email.value;
        const password = registerForm.current.password.value;
        const userInfo = { username, email, password};
        await createUserAccount(userInfo);
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);


  return (
    <>
      <div className="flex flex-col w-60 md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl mt-10">
        <div className="">
          <section className="rounded-md p-2 bg-white">
            <div className="flex items-center justify-center my-3">
              <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                <div className="mb-2"></div>
                <h2 className="text-2xl font-bold leading-tight">
                  Sign up to create account
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  Already have an account? <Link to="/signin">Sign In</Link>
                </p>
                {error && <p className="text-red-500 mt-2">{error}</p>}
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
          <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel> Password</FormLabel>
                <FormControl>
                <div className="flex flex-grid-2">
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-1">{showPassword ? "Hide" : "Show"}</button>
                </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PhoneNumberInput onChange={(value) => form.setValue("contact", value)}/>
          <button type="submit" className="w-full bg-blue-500">Create an account</button>
          </form>
        </Form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignUp;
