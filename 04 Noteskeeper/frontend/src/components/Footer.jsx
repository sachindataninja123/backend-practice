import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-[90%] mx-auto mt-12 mb-6 bg-[#1e293b] border border-gray-800 rounded-4xl text-white">
      
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
            to="/create-note"
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