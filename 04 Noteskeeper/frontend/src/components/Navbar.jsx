

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="bg-[#1e293b] border border-gray-800 
      backdrop-blur-xl 
      shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
      hover:border-gray-600 
      hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
      transition-all duration-300 
      w-[95%] md:w-[86%] mx-auto 
      text-white px-6 md:px-10 py-4 mt-3 md:rounded-full rounded-3xl relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          Notes<span className="text-[#38bdf8]">App</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-300 hover:text-[#38bdf8] ${
                isActive ? "text-[#38bdf8]" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-notes"
            className={({ isActive }) =>
              `transition duration-300 hover:text-[#38bdf8] ${
                isActive ? "text-[#38bdf8]" : ""
              }`
            }
          >
            Create Note
          </NavLink>

          <NavLink
            to="/notes-history"
            className={({ isActive }) =>
              `transition duration-300 hover:text-[#38bdf8] ${
                isActive ? "text-[#38bdf8]" : ""
              }`
            }
          >
            Notes History
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-[#38bdf8]"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
         className="md:hidden mt-5 flex flex-col gap-5
          bg-[#0f172a] border border-gray-800
          rounded-2xl p-6"

        >
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `transition duration-300 hover:text-[#38bdf8] ${
                isActive ? "text-[#38bdf8]" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-notes"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `transition duration-300 hover:text-[#38bdf8] ${
                isActive ? "text-[#38bdf8]" : ""
              }`
            }
          >
            Create Note
          </NavLink>

          <NavLink
            to="/notes-history"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `transition duration-300 hover:text-[#38bdf8] ${
                isActive ? "text-[#38bdf8]" : ""
              }`
            }
          >
            Notes History
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;