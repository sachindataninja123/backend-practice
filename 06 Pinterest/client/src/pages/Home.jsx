// import React, { useContext } from "react";
// import PinCard from "../components/PinCard";
// import Navbar from "../components/Navbar";
// import { PostContext } from "../context/PostContext";
// import { AuthContext } from "../context/AuthContext";

// const Home = () => {
//   const { user } = useContext(AuthContext);
//   const { posts, handleDeletePost, handleSavePost, search } =
//     useContext(PostContext);

//   const filteredPosts = posts.filter((post) => {
//     const query = search.toLowerCase();

//     return (
//       post.title?.toLowerCase().includes(query) ||
//       post.description?.toLowerCase().includes(query) ||
//       post.tags?.some((tag) => tag.toLowerCase().includes(query))
//     );
//   });

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       {filteredPosts.map((post) => (
//         <PinCard key={post._id} post={post} />
//       ))}

//       {/* Feed */}
//       <div className="p-4 columns-2 md:columns-3 lg:columns-5 gap-4">
//         {posts.map((post) => (
//           <div
//             key={post._id}
//             className="mb-4 break-inside-avoid cursor-pointer"
//           >
//             <PinCard
//               post={post}
//               showSave={true}
//               showDelete={user?._id === post.user._id}
//               onSave={handleSavePost}
//               onDelete={handleDeletePost}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useContext } from "react";
import PinCard from "../components/PinCard";
import Navbar from "../components/Navbar";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  const {
    posts,
    handleDeletePost,
    handleSavePost,
    search,
  } = useContext(PostContext);

  const filteredPosts = posts.filter((post) => {
    const query = search.toLowerCase();

    return (
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="p-4 columns-2 md:columns-3 lg:columns-5 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="mb-4 break-inside-avoid"
          >
            <PinCard
              post={post}
              showSave={!!user}
              showDelete={user?._id === post.user._id}
              onSave={handleSavePost}
              onDelete={handleDeletePost}
            />
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          No pins found.
        </div>
      )}
    </div>
  );
};

export default Home;