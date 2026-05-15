import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // Ref
  const navbarRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="
      bg-[#1e293b]/95
      border border-gray-700
      backdrop-blur-xl
      shadow-lg
      w-[95%] md:w-[90%]
      mx-auto
      mt-3
      px-5 md:px-8
      py-4
      rounded-2xl md:rounded-full
      text-white
      relative
      z-50
    "
    >
      {/* Main Navbar */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold">
          Notes<span className="text-sky-400">App</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${isActive ? "text-sky-400" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-notes"
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${isActive ? "text-sky-400" : ""}`
            }
          >
            Create Note
          </NavLink>

          <NavLink
            to="/notes-history"
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${isActive ? "text-sky-400" : ""}`
            }
          >
            Notes History
          </NavLink>

          {/* Profile */}
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpenProfile(!openProfile)}>
              <CgProfile size={26} className="hover:text-sky-400 transition" />
            </button>

            {openProfile && (
              <div
                className="
                absolute right-0 top-12
                w-44
                bg-[#0f172a]
                border border-gray-700
                rounded-xl
                shadow-xl
                overflow-hidden
              "
              >
                <Link
                  to="/login"
                  onClick={() => setOpenProfile(false)}
                  className="block px-4 py-3 hover:bg-slate-700"
                >
                  Login
                </Link>

                <Link
                  to="/myprofile"
                  onClick={() => setOpenProfile(false)}
                  className="block px-4 py-3 hover:bg-slate-700"
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Profile */}
          <div className="relative flex items-center justify-center">
            <button onClick={() => setOpenProfile(!openProfile)}>
              <CgProfile size={24} />
            </button>

            {openProfile && (
              <div
                className="
                absolute right-0 top-10
                w-40
                bg-[#0f172a]
                border border-gray-700
                rounded-xl
                shadow-xl
                overflow-hidden
              "
              >
                <Link
                  to="/login"
                  onClick={() => {
                    setOpenProfile(false);
                    setIsOpen(false);
                  }}
                  className="block px-4 py-3 hover:bg-slate-700"
                >
                  Login
                </Link>

                <Link
                  to="/myprofile"
                  onClick={() => {
                    setOpenProfile(false);
                    setIsOpen(false);
                  }}
                  className="block px-4 py-3 hover:bg-slate-700"
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sky-400 text-3xl"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="
          md:hidden
          mt-5
          flex flex-col
          gap-5
          bg-[#0f172a]
          border border-gray-700
          rounded-2xl
          p-5
        "
        >
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${isActive ? "text-sky-400" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-notes"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${isActive ? "text-sky-400" : ""}`
            }
          >
            Create Note
          </NavLink>

          <NavLink
            to="/notes-history"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${isActive ? "text-sky-400" : ""}`
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
