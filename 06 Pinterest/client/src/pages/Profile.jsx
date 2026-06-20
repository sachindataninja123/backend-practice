import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePostModal from "../components/CreatePostmodel";
import { PostContext } from "../context/PostContext";

const Profile = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const { post } = useContext(PostContext);
  console.log(post);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center">
          <div className="w-25 h-25 rounded-full bg-red-500 flex items-center justify-center text-white text-5xl font-bold">
            {user.fullname?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl capitalize font-bold mt-4">
            {user.fullname}
          </h1>

          <p className="text-gray-500">@{user.username}</p>

          <p className="mt-2 text-gray-600">{user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-5 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            Logout
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="mt-3 bg-black cursor-pointer text-white px-6 py-2 rounded-full"
          >
            Create Post
          </button>
        </div>

        {/* User Pins */}
        <div className="mt-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 ">My Pins</h2>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {post?.post.image.map((post, index) => (
              <img
                key={index}
                src={post}
                alt="pin"
                className="mb-4 rounded-2xl w-full"
              />
            ))}
          </div>
        </div>
      </div>
      <CreatePostModal isOpen={showModal} onClose={() => setShowModal(false)} />
      ;
    </>
  );
};

export default Profile;
