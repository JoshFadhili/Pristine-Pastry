import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./lib/AuthContext";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginForm.current) {
      const email = loginForm.current.email.value;
      const password = loginForm.current.password.value;
      const userInfo = { email, password };
      loginUser(userInfo);
      if(userInfo.email =="joshuartzamani77@gmail.com"){
        navigate("/baker")
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome Back!</h1>
      <form onSubmit={handleSubmit} ref={loginForm} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            placeholder="Enter your email"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
          )}
          <br />
          <br />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...form.register("password")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            placeholder="Enter your password"
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            No account yet?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Create one
            </Link>
          </p>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;