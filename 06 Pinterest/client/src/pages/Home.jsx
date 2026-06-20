import React, { useContext } from "react";
import PinCard from "../components/PinCard";
import Navbar from "../components/Navbar";
import { PostContext } from "../context/PostContext";

const Home = () => {
  const { posts } = useContext(PostContext);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Feed */}
      <div className="p-4 columns-2 md:columns-3 lg:columns-5 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 break-inside-avoid cursor-pointer">
            <PinCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
