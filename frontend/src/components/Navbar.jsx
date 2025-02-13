import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // corrected import for react-router-dom
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LuCircleUserRound } from "react-icons/lu";
import { UserContext } from "../context/UserContext";

export const Navbar = () => {
  const { isLogin, setIsLogin } = useContext(UserContext);
  
  let username = localStorage.getItem("username").trim();
  username=username.split(" ")[0];
  const access = localStorage.getItem("accessToken");

  useEffect(() => {
    if (access === "") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [access, setIsLogin]); 

  const logout = () => {
    setIsLogin(false);
    localStorage.setItem("accessToken", "");
    localStorage.setItem("username", "");
  };

  return (
    <nav className="navbar flex justify-between p-6 px-20 bg-cyan-100">
      <div className="nav-heading-container flex items-center gap-2 hover:cursor-pointer">
        <Link to="Notes" className="flex gap-2">
       
        <div className="nav-icon">
          <HiOutlinePencilSquare size={30} />
        </div>
        <div className="nav-heading font-bold text-2xl">
          <h2>Notes app</h2>
        </div>
        </Link>
      </div>
      {isLogin ? (
        <div className="nav-items flex">
          <ul className="flex gap-5 text-lg items-center">
            <li className="font-semibold text-3xl">Welcome, {username}</li>
            <LuCircleUserRound size={40}  className="cursor-pointer"/>
            <li onClick={logout}>
              <Link
                to="Login"
                className="border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 duration-300"
              >
                Logout
              </Link>
            </li>
          
          </ul>
        </div>
      ) : (
        <div className="nav-items flex">
          <ul className="flex gap-5 text-lg">
            <li>
              <Link
                to="Register"
                className="transition-all ease-in-out delay-150 hover:text-slate-600 hover:scale-110 duration-200"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="Login"
                className="border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      
      )}
    </nav>
  );
};
