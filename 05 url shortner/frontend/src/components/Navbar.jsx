import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiX } from "react-icons/hi";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="px-6 md:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-sky-400 tracking-wide">
          Shortly
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-base">
          <Link
            to="/"
            className="text-slate-300 hover:text-sky-400 transition duration-300"
          >
            Home
          </Link>

          <a
            href="#features"
            className="text-slate-300 hover:text-sky-400 transition duration-300"
          >
            Features
          </a>

          <Link
            to="/login"
            className="bg-sky-500 hover:bg-sky-600 transition duration-300 text-white px-5 py-2 rounded-full font-medium shadow-lg"
          >
            Login
          </Link>

          <Link
            to="/myprofile"
            className="text-gray-200 hover:text-sky-400 transition"
          >
            <CgProfile size={32} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <HiX size={30} /> : <CiMenuFries size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-5 flex flex-col gap-5">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-sky-400 transition"
          >
            Home
          </Link>

          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-sky-400 transition"
          >
            Features
          </a>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="bg-sky-500 hover:bg-sky-600 transition text-white px-5 py-3 rounded-xl font-medium text-center"
          >
            Login
          </Link>

          <Link
            to="/myprofile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition"
          >
            <CgProfile size={28} />
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
