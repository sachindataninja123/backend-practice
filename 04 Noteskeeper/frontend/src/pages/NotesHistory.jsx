import React, { useContext, useEffect } from "react";
import { NotesContext } from "../../context/notesContext";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const NotesHistory = () => {
  const { notes, getAllNotes } = useContext(NotesContext);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-14">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-10">
        <p className="text-[#38bdf8] uppercase tracking-[0.2em] text-sm font-semibold">
          Notes Archive
        </p>

        <h1 className="text-5xl font-bold mt-3">Your Notes History</h1>

        <p className="text-gray-400 mt-4">
          Access all your saved thoughts and ideas in one place.
        </p>
      </div>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          [...notes].reverse().map((note) => (
            <div
              key={note._id}
              className="bg-[#1e293b] border border-gray-800 
              rounded-lg p-5 transition-all duration-300
              hover:border-[#38bdf8]/40 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#38bdf8]">
                  {note.title}
                </h2>
                <div className="flex items-center gap-3 ">
                  {/* Delete Button */}
                  <button
                    className="group flex items-center justify-center
    w-9 h-9 rounded-xl
    bg-red-500/10 border border-red-500/20
    hover:bg-red-500 hover:border-red-500
    transition-all duration-300
    hover:scale-110 cursor-pointer"
                  >
                    <MdDeleteOutline
                      className="text-xl text-red-400
      group-hover:text-white transition-all duration-300"
                    />
                  </button>

                  {/* Edit Button */}
                  <button
                    className="group flex items-center justify-center
    w-9 h-9 rounded-xl
    bg-cyan-500/10 border border-cyan-500/20
    hover:bg-cyan-500 hover:border-cyan-500
    transition-all duration-300
    hover:scale-110 cursor-pointer"
                  >
                    <CiEdit
                      className="text-xl text-cyan-400
      group-hover:text-white transition-all duration-300"
                    />
                  </button>
                </div>
              </div>

              <p className="text-gray-400 mt-4 leading-relaxed">
                {note.content}
              </p>
              {/* Date & Time */}
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
            <h2 className="text-2xl text-gray-400">No Notes Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHistory;
