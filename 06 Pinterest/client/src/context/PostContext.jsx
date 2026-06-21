import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  savePost,
} from "../services/postService";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savePosts, setSavePosts] = useState([]);
  const navigate = useNavigate();

  const { postId } = useParams();

  const handleCreatePost = async (formData) => {
    try {
      const data = await createPost(formData);
      setPosts((prev) => [data.post, ...prev]); // add new post to top
      toast.success(data?.message);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Post creation failed");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPosts();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const data = await getMyPosts();
      setMyPosts(data.posts);
    };

    fetchMyPosts();
  }, []);

  const handleSavePost = async () => {
    try {
      const data = await savePost(postId);
      setSavePosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const data = await deletePost(postId);
      setMyPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        myPosts,
        setMyPosts,
        handleCreatePost,
        loading,
        handleDeletePost,
        handleSavePost,
        savePosts,
        setSavePosts
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
