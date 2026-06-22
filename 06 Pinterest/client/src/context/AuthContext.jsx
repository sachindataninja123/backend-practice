import { useState } from "react";
import { createContext } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  getSavedPosts,
} from "../services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const data = await registerUser(formData);

      setUser(data);
      toast.success(data?.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  const handleLogin = async (formData) => {
    try {
      const data = await loginUser(formData);
      setUser(data);

      toast.success(data?.message);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logoutUser();

      localStorage.removeItem("token");
      toast.success(data?.message);
      setUser(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const data = await getSavedPosts();

        setSavedPosts(data.savedPosts);
       
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleRegister,
        loading,
        handleLogout,
        savedPosts,
        setSavedPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
