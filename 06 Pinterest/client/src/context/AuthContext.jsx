import { useState } from "react";
import { createContext } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

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
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user)

  return (
    <AuthContext.Provider value={{ user, setUser, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
