import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user, handleLogout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow">
      <Link to="/" className="text-2xl font-bold text-red-500">
        Pinterest
      </Link>
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-full px-4 py-2 w-125"
      />
      <div className="flex items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-10">
          <Link
            className="font-medium hover:text-red-500 transition-all duration-150"
            to="/"
          >
            Feed
          </Link>
          <Link
            to="/add-post"
            className="font-medium hover:text-red-500 transition-all duration-150 cursor-pointer"
          >
            Create Post
          </Link>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} className="cursor-pointer">
            <FaRegUserCircle size={26} />
          </button>
          {open && (
            <div className="absolute transition-all duration-300 right-0 mt-3 w-56 bg-white border shadow-lg rounded-xl p-4">
              {user ? (
                <>
                  <Link to="/profile" className="block py-2 hover:text-red-500">
                    Profile
                  </Link>
                  <div className="border-t">
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="w-full cursor-pointer text-left py-2 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 cursor-pointer hover:text-red-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 border-t cursor-pointer hover:text-red-500"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
