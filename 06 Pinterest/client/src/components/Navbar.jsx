import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaPlus, FaSignOutAlt } from "react-icons/fa";

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
          <button onClick={() => setOpen(!open)} className="cursor-pointer ">
            {user ? (
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
              </div>
            ) : (
              <FaRegUserCircle size={28} />
            )}
          </button>
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaUser /> <span>Profile</span>
                    </Link>

                    <Link
                      to="/add-post"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaPlus /> <span>Create Post</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t p-2">
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer flex justify-start items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4">
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      Welcome 👋
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="block w-full text-center bg-red-500 text-white py-2 rounded-xl font-medium hover:bg-red-600 transition-all duration-200"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="block w-full text-center border border-gray-300 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
