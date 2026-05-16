import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });

      console.log(res.data);

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-800 p-10">
      <form
        onSubmit={(e) => submitHandler(e)}
        action=""
        className="bg-gray-400 p-10"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="enter email"
          className="p-3 border w-full "
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="enter password"
          className="p-3 border w-full mt-3 "
        />
        <button type="submit" className="bg-blue-400 p-2 px-5 mt-4 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
