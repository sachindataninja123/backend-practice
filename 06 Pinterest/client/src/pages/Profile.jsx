import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const pins = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <div className="w-25 h-25 rounded-full bg-red-500 flex items-center justify-center text-white text-5xl font-bold">
          {user.user.fullname?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-3xl font-bold mt-4">{user.user.fullname}</h1>

        <p className="text-gray-500">@{user.user.username}</p>

        <p className="mt-2 text-gray-600">{user.user.email}</p>

        <button className="mt-5 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
          Edit Profile
        </button>
      </div>

      {/* User Pins */}
      <div className="mt-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 ">My Pins</h2>
  
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {pins.map((pin, index) => (
            <img
              key={index}
              src={pin}
              alt="pin"
              className="mb-4 rounded-2xl w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
