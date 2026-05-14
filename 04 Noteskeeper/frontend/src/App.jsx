import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotesHistory from "./pages/NotesHistory";
import Register from "./pages/Register";
import Login from "./pages/Login";


import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      <Navbar />

      {/* Toast Container (GLOBAL - ONLY ONCE) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-notes" element={<CreateNote />} />
          <Route path="/notes-history" element={<NotesHistory />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
