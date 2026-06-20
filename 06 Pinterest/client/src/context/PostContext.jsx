import { useState } from "react";
import { createContext } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost } from "../services/postService";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCreatePost = async (formData) => {
    try {
      const data = await createPost(formData);
      setPost(data.post);

      toast.success(data?.message);
      navigate("/profile")
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        handleCreatePost,
        loading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
