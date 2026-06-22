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
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { postId } = useParams();

  const handleCreatePost = async (formData) => {
    try {
      const data = await createPost(formData);
      setPosts((prev) => [data.post, ...prev]);
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

  const handleSavePost = async (postId) => {
    try {
      const data = await savePost(postId);
      setSavePosts(data.posts);
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Post save failed");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const data = await deletePost(postId);
      setMyPosts(data.posts);
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Post deletion failed");
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
        setSavePosts,
        search,
        setSearch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
