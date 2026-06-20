import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PostContext } from "../context/PostContext";
import { getSinglePost } from "../services/postService";
import Navbar from "../components/Navbar";

const SinglePostpage = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getSinglePost(id);

        setPost(data.post);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Post Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-5">
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          {post.image && (
            <img
              src={`http://localhost:8000/uploads/${post.image}`}
              alt={post.title}
              className="w-full h-112.5 object-cover"
            />
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

            <p className="text-gray-600 mb-4">
              Posted by{" "}
              <span className="font-semibold">{post.user?.fullname}</span>
            </p>

            <p className="text-gray-800 leading-relaxed">{post.description}</p>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
              <span>❤️ {post.likes?.length || 0} Likes</span>
              <span>💬 {post.comments?.length || 0} Comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostpage;
