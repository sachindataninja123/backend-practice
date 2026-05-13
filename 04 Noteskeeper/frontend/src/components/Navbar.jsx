import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="bg-[#1e293b] border border-gray-800 
backdrop-blur-xl 
shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
hover:border-gray-600 
hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
transition-all duration-300  w-[86%] m-auto text-white px-10 py-3 mt-3 rounded-4xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          Notes<span className="text-[#38bdf8]">App</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-200 hover:text-yellow-400 ${
                isActive ? "text-yellow-400" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-notes"
            className={({ isActive }) =>
              `transition duration-200 hover:text-yellow-400 ${
                isActive ? "text-yellow-400" : ""
              }`
            }
          >
            Create Note
          </NavLink>

          <NavLink
            to="/notes-history"
            className={({ isActive }) =>
              `transition duration-200 hover:text-yellow-400 ${
                isActive ? "text-yellow-400" : ""
              }`
            }
          >
            Notes History
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
