import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/notesContext";
import axios from "axios";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { createNote, notes, getAllNotes } = useContext(NotesContext);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      title,
      content,
    };

    await createNote(noteData);

    setTitle("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white px-6 py-16 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="md:w-[90%] m-auto h-full flex flex-col md:flex-row items-start justify-between gap-9">
        {/* Form Container */}
        <div className="max-w-2xl md:w-1/2 mx-auto relative z-10">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold">
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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

        <div className="md:w-1/2 border-2 p-4  rounded-lg border-gray-800 ">
          <div className="flex justify-between items-center mb-3 ">
            <h1 className="uppercase text-lg text-[#38bdf8] font-semibold ">
            Your Thoughts
          </h1>
          <Link to="/notes-history"
            className="group flex items-center justify-center
              w-9 h-9 rounded-xl
              bg-cyan-500/10 border border-cyan-500/20
              hover:bg-cyan-500 hover:border-cyan-500
              transition-all duration-300
              hover:scale-110 cursor-pointer"
          >
            <FaArrowUpRightFromSquare
              className="text-xl text-cyan-400
                group-hover:text-white transition-all duration-300"
            />
          </Link>
          </div>
          <div className="overflow-y-auto h-[70vh]">
            <div className="flex flex-col gap-2 ">
              {notes.length > 0 ? (
                [...notes].reverse().map((note) => (
                  <div
                    key={note._id}
                    className="relative bg-[#1e293b] border border-gray-800 
                    rounded-md p-4 overflow-hidden
          backdrop-blur-xl
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)]
          hover:border-[#38bdf8]/40
          hover:-translate-y-2
          hover:shadow-cyan-500/10
          transition-all duration-300 flex flex-col justify-center"
                  >
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>

                    {/* Header */}
                    <div className="relative z-10 flex items-start justify-between">
                      <h2 className="text-xl font-bold text-[#38bdf8] line-clamp-1">
                        {note.title}
                      </h2>

                      <div className="w-3 h-3 rounded-full bg-[#38bdf8] shadow-lg shadow-cyan-400"></div>
                    </div>

                    {/* Content */}
                    <p className="relative z-10 text-gray-400 mt-4 leading-relaxed text-sm">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between mt-5">
                      <span className="text-xs text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>

                      <span className="text-xs text-[#38bdf8]">
                        {new Date(note.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <h2 className="text-2xl font-semibold text-gray-400">
                    No Notes Found
                  </h2>

                  <p className="text-gray-500 mt-3">
                    Create your first note to get started 🚀
                  </p>
                  {/* Date & Time */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
