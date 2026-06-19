import { useState } from "react";
import { createContext } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/authService";
import { useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)

  const register = async (formData) => {
    try {
      const data = await registerUser(formData);

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (formData) => {
    try {
      const data = await loginUser(formData);
      setUser(data);

      localStorage.setItem("token", data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        console.log(data)
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
