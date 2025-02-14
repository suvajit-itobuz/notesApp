import react from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ValidateLogin = z.object({
  email: z.string().email({ message: "Invalid email format" }),
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

export const Login = () => {
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(UserContext);

  // changing the password input type for the eye functionality
  const changePasswordType = (e) => {
    if (password === "password") {
      setPassword("text");
    } else {
      setPassword("password");
    }
  };

  // use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ValidateLogin),
  });

  // submit button -----------------
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:8000/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { token, refreshToken, username } = await response.data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("username", username);

      axios.defaults.headers = {
        Authorization: "Bearer " + token,
      };
      if (response.status === 201) {
        notify("success");
        await navigate("/Notes", { replace: true });
        setIsLogin(true);
        reset();
      } else {
        notify("fail");
      }
    } catch (error) {
      if (error.response.data.data === "user is not verified") {
        notify("User not verified");
      } else {
        notify("fail");
      }
    }
  };

  // toast functionality--------------------
  const notify = (value) => {
    if (value === "success") {
      toast.success("Login successful!", { autoClose: 3000 });
    } else if (value === "fail") {
      toast.error("Invalid Credentials. Try again", { autoClose: 3000 });
    } else if (value === "User not verified") {
      toast.error("User is not verified", { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className=" h-[93.3vh] items-center flex flex-col bg-cyan-200 justify-center ">
        <div className=" flex flex-col gap-16 bg-cyan-50 p-14 px-14 rounded-lg ">
          <h1 className="text-5xl text-center font-bold">Sign In</h1>
          <form
            action="#"
            className="flex flex-col items-center gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center gap-10 ">
              <div className=" flex  gap-2 flex-col w-[26vw]">
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
                {errors.email ? (
                  <span className="text-red-500">{errors.email.message}</span>
                ) : (
                  <span className="text-red-500 invisible">""</span>
                )}
              </div>
              <div className=" flex  gap-2 flex-col w-[26vw]">
                <label htmlFor="password" className="text-xl  font-bold ">
                  Password:
                </label>
                <div className="password-image w-full relative ">
                  <input
                    type={password}
                    name="password"
                    placeholder="Enter your password"
                    id="userpassword"
                    className="p-2 border-2 rounded  w-full"
                    autoComplete="on"
                    {...register("password")}
                  />
                  {password === "password" ? (
                    <span className="absolute top-0 right-0 h-full pe-5 pt-3 cursor-pointer">
                      <FaEye
                        className="cursor-pointer"
                        onClick={changePasswordType}
                        size={20}
                      />
                    </span>
                  ) : (
                    <span className="absolute top-0 right-0 h-full pe-5 pt-3 cursor-pointer">
                      <FaEyeSlash
                        size={20}
                        className="cursor-pointer"
                        onClick={changePasswordType}
                      />
                    </span>
                  )}
                </div>
                {errors.password ? (
                  <span className="text-red-500 transition-all ease-in-out 3s">
                    {errors.password.message}
                  </span>
                ) : (
                  <span className="text-red-500 invisible">""</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-xl border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150  hover:scale-105 hover:bg-slate-800 duration-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
