import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    //   console.log(res.data);

      setEmail("");
      setName("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.log("register error", error);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="enter name"
          className="p-3 border w-full "
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="enter email"
          className="p-3 border w-full mt-3"
        />
      
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="enter password"
          className="p-3 border w-full mt-3 "
        />
        <button type="submit" className="bg-blue-400 p-2 px-5 mt-4 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
