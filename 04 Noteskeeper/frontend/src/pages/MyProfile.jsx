import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const user = await axios.get("http://localhost:3000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(user.data.user);
    } catch (error) {
      console.log("Error in fetching user Details: ", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-10">
      {/* Profile Card */}
      <div
        className="
        max-w-4xl
        mx-auto
        bg-[#1e293b]
        border border-gray-700
        rounded-3xl
        shadow-2xl
        overflow-hidden
      "
      >
        {/* Top Banner */}
        <div className="h-40 bg-linear-to-r from-sky-500 to-blue-700 relative">
          {/* Profile Icon */}
          <div
            className="
            absolute
            left-1/2
            -bottom-16
            -translate-x-1/2
            bg-[#0f172a]
            p-4
            rounded-full
            border-4 border-[#1e293b]
          "
          >
            <CgProfile size={90} className="text-sky-400" />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-24 pb-10 px-6 md:px-10 text-center">
          {/* Name */}
          <h1 className="text-3xl capitalize font-semibold">{user?.name}</h1>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-300">
            <MdEmail />
            <span>{user?.email}</span>
          </div>

          {/* Joined */}
          <p className="text-gray-400 mt-2">
            Joined: {new Date(user?.createdAt).toDateString()}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              className="
              border border-red-500
              text-red-400
              hover:bg-red-500 hover:text-white
              px-6 py-3
              rounded-xl
              transition
            "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
