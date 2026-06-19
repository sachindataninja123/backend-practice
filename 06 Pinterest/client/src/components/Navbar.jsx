import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow">
      <Link to="/" className="text-2xl font-bold text-red-500">
        Pinterest
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="border rounded-full px-4 py-2 w-96"
      />

      <Link to="/profile/1" className="w-10 h-10 rounded-full bg-gray-300" />
    </nav>
  );
};

export default Navbar;
