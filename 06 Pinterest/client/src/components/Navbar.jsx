import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { search, setSearch } = useContext(PostContext);

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
      <Link
        to="/"
        onClick={() => setSearch("")}
        className="text-2xl font-bold text-red-500"
      >
        Pinterest
      </Link>
      <div className="relative">
        <input
          type="text"
          placeholder="Search pins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-125 rounded-full bg-gray-100 px-5 py-3 border border-red-300 pl-12 outline-none focus:ring-2 focus:ring-red-400"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-10">
          <NavLink
            to="/"
            onClick={() => setSearch("")}
            className={({ isActive }) =>
              `text-[15px] font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500 pb-1"
                  : "text-gray-700 hover:text-red-500"
              }`
            }
          >
            Feed
          </NavLink>

          <NavLink
            to="/add-post"
            className={({ isActive }) =>
              `text-[15px] font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500 pb-1"
                  : "text-gray-700 hover:text-red-500"
              }`
            }
          >
            Create Post
          </NavLink>

          <NavLink
            to="/saved-posts"
            onClick={() => setSearch("")}
            className={({ isActive }) =>
              `text-[15px] font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? "text-red-500 border-b-2 border-red-500 pb-1"
                  : "text-gray-700 hover:text-red-500"
              }`
            }
          >
            Saved Posts
          </NavLink>
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
                      onClick={() => {
                        setOpen(false);
                        setSearch("");
                      }}
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
