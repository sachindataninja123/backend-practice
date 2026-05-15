import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);

      toast.success(res.data.message);

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div
        className="relative bg-[#1e293b] border border-gray-800 
backdrop-blur-xl 
shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
hover:border-gray-600 
hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
transition-all duration-300  rounded-xl md:p-8 p-4 md:w-[80%] lg:w-[40%] w-full "
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-200">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-300 text-sm mt-1">
          Login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm  text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full bg-[#0f172a] border border-gray-700 
                focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/20
                outline-none rounded-xl px-5 py-3 text-white 
                placeholder-gray-500 transition-all duration-300"
              placeholder="Enter email..."
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm  text-gray-300">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              required
              className="w-full bg-[#0f172a] border border-gray-700 
                focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/20
                outline-none rounded-xl px-5 py-3 text-white 
                placeholder-gray-500 transition-all duration-300"
              placeholder="Enter password..."
            />
          </div>

          {/* Button */}
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] 
              text-black font-semibold py-3 rounded-lg  
              transition-all duration-300 hover:-translate-y-1
              shadow-lg hover:shadow-cyan-500/30 cursor-pointer flex items-center justify-center"
            >
              Login
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#38bdf8] text-md hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
