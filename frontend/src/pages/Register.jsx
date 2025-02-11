import react from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const validateRegister = z.object({
  userName: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" }),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    }),
});

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateRegister),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:8000/register`, data);

      if (response.data.status === 201) {
        localStorage.setItem("username", data.userName);
        notify("success");
      } else {
        notify("user exists");
      }
    } catch (error) {
      console.log(error);
      notify("fail");
    }
  };

  const notify = (value) => {
    if (value === "success") {
      toast.success(
        "Registration successful! Please check your email to verify your account.",
        { autoClose: 3000 }
      );
    } else if (value === "fail") {
      toast.error("Registration failed. Try again", { autoClose: 3000 });
    } else if (value === "user exists") {
      toast.error("User already exists", { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className="registration-form h-[93.3vh] items-center flex flex-col bg-cyan-200 justify-center ">
        <div className="registration-heading-input-container  flex flex-col gap-16 bg-cyan-50 p-14 px-14 rounded-lg ">
          <h1 className="text-5xl text-center font-bold">Sign Up</h1>
          <form
            action="#"
            className="flex flex-col items-center gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="registration-input-container flex flex-col items-center gap-10 ">
              <div className="registration-input flex  gap-2 flex-col w-[26vw]">
                <label htmlFor="name" className="text-xl font-bold ">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  id="username"
                  name="username"
                  className="p-2  border-2 rounded"
                  {...register("userName")}
                />

                {errors?.userName && (
                  <span className="text-red-500">
                    {errors.userName.message}
                  </span>
                )}
              </div>
              <div className="registration-input flex  gap-2 flex-col w-[26vw]">
                <label htmlFor="email" className="text-xl font-bold ">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  id="useremail"
                  className="p-2 border-2 rounded "
                  {...register("email")}
                />
                {errors?.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="registration-input flex  gap-2 flex-col w-[26vw]">
                <label htmlFor="password" className="text-xl  font-bold ">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="userpassword"
                  className="p-2 border-2 rounded  "
                  autoComplete="on"
                  {...register("password")}
                />
                {errors?.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-xl border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150  hover:scale-105 hover:bg-slate-800 duration-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
