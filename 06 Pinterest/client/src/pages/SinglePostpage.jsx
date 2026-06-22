import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PostContext } from "../context/PostContext";
import { getSinglePost } from "../services/postService";
import Navbar from "../components/Navbar";
import SinglePin from "../components/SinglePin";
import { AuthContext } from "../context/AuthContext";

const SinglePostpage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { handleSavePost, handleDeletePost } = useContext(PostContext);

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
        <SinglePin
          post={post}
          showSave={!!user}
          showDelete={user?._id === post.user._id}
          onSave={handleSavePost}
          onDelete={handleDeletePost}
        />
      </div>
    </>
  );
};

export default SinglePostpage;
