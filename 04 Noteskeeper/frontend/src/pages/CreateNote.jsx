import React, { useState } from "react";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteData = {
      title,
      description,
    };

    console.log(noteData);

    setTitle("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white px-6 py-16 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Heading */}
        <div className="mb-10 text-center">

          <h1 className="text-5xl font-bold">
            Write Your
            <span className="text-[#38bdf8]"> Thoughts</span>
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Capture ideas, tasks, and important notes beautifully.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="bg-[#1e293b]/80 backdrop-blur-xl border border-gray-800 
          rounded-xl p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-300">
                Note Title
              </label>

              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 
                focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/20
                outline-none rounded-xl px-5 py-4 text-white 
                placeholder-gray-500 transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-300">
                Description
              </label>

              <textarea
                rows="8"
                placeholder="Write your note here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 
                focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/20
                outline-none rounded-xl px-5 py-4 text-white 
                placeholder-gray-500 resize-none transition-all duration-300"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] 
              text-black font-semibold py-3 rounded-lg  
              transition-all duration-300 hover:-translate-y-1
              shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
            >
              Save Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
