import react from "react";
import { Link } from "react-router";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar flex justify-between p-6 px-20 bg-cyan-100">
        <div className="nav-heading-container flex items-center gap-2 hover:cursor-pointer">
          <div className="nav-icon ">
            <HiOutlinePencilSquare size={30} />
          </div>
          <div className="nav-heading font-bold text-2xl">
            <h2>Notes app</h2>
          </div>
        </div>
        <div className="nav-items flex">
          <ul className="flex gap-5 text-lg">
            <li>
              <Link to="Register" className="transition-all ease-in-out delay-150 hover:text-slate-600 hover:scale-110 duration-200">
                Register </Link>
            </li>
            <li>
              <Link to="Login"
              
                className="border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
