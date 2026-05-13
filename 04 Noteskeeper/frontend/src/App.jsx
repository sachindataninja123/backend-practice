import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotesHistory from "./pages/NotesHistory";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]  flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-notes" element={<CreateNote />} />
          <Route path="/notes-history" element={<NotesHistory />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
