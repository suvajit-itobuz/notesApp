import React from "react";
import react from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Navigate } from 'react-router-dom';

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

  // let statusMessage = null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ValidateLogin),
  });

  const onSubmit = async (data) => {
    try {

      const response = await axios.post(`http://localhost:8000/login`, data);
      if (response.status === 201) {

        <Navigate to="/Notes" />
        setLoginStatus("success");
      } else {
        setLoginStatus("error");
        alert("Login Failed");
      }

      console.log(response.status);
    } catch (error) {
      setLoginStatus("error");
      console.log(error);
    }
  };
  const [loginstatus, setLoginStatus] = useState(null);
  let statusMessage=null;

  if (loginstatus === "success") {

    <Navigate to="/Notes" />
    statusMessage = (
      <div className="text-blue-500">
        Login successful! 
      </div>
    );

  } else if (loginstatus === "error") {
    statusMessage = (
      <div className="text-red-500">Login Failed. Please try again.</div>
    );
  }

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
                  {errors?.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
              </div>
              <div className=" flex  gap-2 flex-col w-[26vw]">
                <label htmlFor="password" className="text-xl  font-bold ">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="userpassword"
                  className="p-2 border-2 rounded "
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
              Login
            </button>
            {statusMessage}
          </form>
        </div>
      </div>
    </>
  );
};
