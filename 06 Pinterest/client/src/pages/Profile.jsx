import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PinCard from "../components/PinCard";

const Profile = () => {
  const { user, handleLogout } = useContext(AuthContext);

  const { myPosts, handleDeletePost, handleSavePost } = useContext(PostContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full mx-auto px-4 py-10">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-red-500 flex items-center justify-center text-white text-5xl font-bold">
            {user.fullname?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl capitalize font-bold mt-4">
            {user.fullname}
          </h1>

          <p className="text-gray-500">@{user.username}</p>

          <p className="mt-2 text-gray-600">{user.email}</p>

          <div className="flex justify-center items-center gap-5 mt-3">
            <Link
              to="/add-post"
              className="mt-3 bg-black cursor-pointer text-white px-6 py-2 rounded-full"
            >
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              className="mt-3 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* User Pins */}
        <div className="mt-12">
          <div className="flex px-4 items-center justify-start mb-5 gap-1">
            <h2 className="text-2xl font-semibold ">My Pins</h2>
            <p className="mt-0.5">({myPosts?.length})</p>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-5 gap-4 px-4">
            {myPosts?.map((post) => (
              <div key={post._id} className="break-inside-avoid mb-4">
                <PinCard
                  post={post}
                  showSave={true}
                  showDelete={true}
                  onSave={handleSavePost}
                  onDelete={handleDeletePost}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
