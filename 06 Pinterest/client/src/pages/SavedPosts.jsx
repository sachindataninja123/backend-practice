import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PinCard from "../components/PinCard";
import Navbar from "../components/Navbar";
import { PostContext } from "../context/PostContext";

const SavedPosts = () => {
  const { savedPosts } = useContext(AuthContext);

  const { search } = useContext(PostContext);

  const filteredPosts = savedPosts.filter((post) => {
    const query = search.toLowerCase();

    return (
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold px-3 mb-8">Saved Posts</h1>

        {savedPosts.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No saved posts yet.
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No posts found.
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
            {filteredPosts.map((post) => (
              <PinCard
                key={post._id}
                post={post}
                showSave={false}
                showDelete={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedPosts;
