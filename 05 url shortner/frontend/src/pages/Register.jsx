import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/users/register", {
        name,
        email,
        password,
      });

      console.log(res.data);

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.log("Register error", error);
    }
  };

  return (
    <div className="min-h-screen md:h-[80vh] bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center">
          <h1 className="md:text-4xl text-2xl font-bold text-white">
            Create Account 🚀
          </h1>

          <p className="text-slate-400 mt-3">
            Join and start shortening your URLs
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="mt-7">
          {/* Name */}
          <div className="mb-5">
            <label className="text-slate-300 text-sm block mb-1">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl outline-none focus:border-sky-500 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="text-slate-300 text-sm block mb-1">Email</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl outline-none focus:border-sky-500 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-slate-300 text-sm block mb-1">
              Password
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create password"
              className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl outline-none focus:border-sky-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 transition duration-300 text-white font-semibold py-4 rounded-xl"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 hover:text-sky-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
