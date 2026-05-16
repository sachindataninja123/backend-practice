import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-sky-400">Shortly</h1>

        <div className="flex items-center gap-6 text-sm md:text-base">
          <a href="#" className="hover:text-sky-400 transition">
            Home
          </a>

          <a href="#features" className="hover:text-sky-400 transition">
            Features
          </a>

          <Link
            to="/login"
            className="bg-sky-500 hover:bg-sky-600 transition px-5 py-2 rounded-xl font-medium"
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
