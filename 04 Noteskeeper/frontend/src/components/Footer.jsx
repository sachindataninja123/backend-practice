import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer  className="bg-[#1e293b] border border-gray-800 
backdrop-blur-xl 
shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
hover:border-gray-600 
hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
transition-all duration-300  rounded-3xl p-1 w-[88%] mb-5 m-auto text-white ">
      
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold">
            Notes<span className="text-[#38bdf8]">App</span>
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Organize your thoughts beautifully.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-gray-300">
          <Link
            to="/"
            className="hover:text-[#38bdf8] transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/create-notes"
            className="hover:text-[#38bdf8] transition duration-300"
          >
            Create Note
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NotesApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;