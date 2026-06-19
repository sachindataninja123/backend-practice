import { useState } from "react";
import { createContext } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const data = await registerUser(formData);

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const data = await loginUser(formData);
      setUser(data);

      localStorage.setItem("token", data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      setUser(null);

      navigate("/login")
    } catch (error) {
      console.log(error);
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

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleLogin, handleRegister, loading, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
