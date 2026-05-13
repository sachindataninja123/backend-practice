import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/notesContext";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotesHistory = () => {
  const { notes, getAllNotes } = useContext(NotesContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { updateNote, deleteNote } = useContext(NotesContext);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const handleEditClick = (note) => {
    setSelectedNote(note);

    setEditTitle(note.title);
    setEditContent(note.content);

    setIsOpen(true);
  };

  const handleUpdate = async () => {
    const updatedData = {
      title: editTitle,
      content: editContent,
    };

    await updateNote(selectedNote._id, updatedData);

    setIsOpen(false);
  };

  const handleDelete = async (note) => {
    await deleteNote(note._id);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-14">
      {/* Heading */}
      <div className="w-full md:max-w-7xl flex justify-between items-center mx-auto mb-8 ">
        <div>
          <div>
            <p className="text-[#38bdf8] uppercase tracking-[0.2em] text-sm font-semibold">
              Notes Archive
            </p>

            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              Your Notes History
            </h1>

            <p className="text-gray-400 mt-4">
              Access all your saved thoughts and ideas in one place.
            </p>
          </div>
        </div>

        <Link
          to="/create-notes"
          className="group flex items-center justify-center
                           w-9 h-9 rounded-xl
                           bg-cyan-500/10 border border-cyan-500/20
                           hover:bg-cyan-500 hover:border-cyan-500
                           transition-all duration-300
                           hover:scale-110 cursor-pointer"
        >
          <FaPlus
            className="text-xl text-cyan-400
                             group-hover:text-white transition-all duration-300"
          />
        </Link>
      </div>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          [...notes].reverse().map((note) => (
            <div
              key={note._id}
              className="bg-[#1e293b] border border-gray-800 
              rounded-lg md:p-5 p-4 transition-all duration-300
              hover:border-[#38bdf8]/40 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#38bdf8]">
                  {note.title}
                </h2>
                <div className="flex items-center gap-3 ">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(note)}
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
                    onClick={() => handleEditClick(note)}
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm
    flex items-center justify-center z-50 px-4"
        >
          <div
            className="bg-[#1e293b] border border-gray-800
      rounded-3xl p-8 w-full max-w-lg
      shadow-2xl relative"
          >
            <div className="flex items-center justify-between flex-row-reverse mb-6">
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-center
    w-7 h-7 rounded-xl
    bg-cyan-500/10 border border-cyan-500/20
    hover:bg-cyan-500 hover:border-cyan-500
    transition-all duration-300
    hover:scale-110 cursor-pointer"
              >
                ✕
              </button>

              {/* Heading */}
              <h2 className="text-3xl font-semibold text-white ">Edit Note</h2>
            </div>

            {/* Title */}
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Note title"
              className="w-full bg-[#0f172a] border border-gray-700
        rounded-xl px-5 py-4 text-white outline-none
        focus:border-[#38bdf8] mb-5"
            />

            {/* Content */}
            <textarea
              rows="6"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Write your note..."
              className="w-full bg-[#0f172a] border border-gray-700
        rounded-xl px-5 py-4 text-white outline-none
        focus:border-[#38bdf8] resize-none"
            />

            {/* Save Button */}
            <button
              onClick={handleUpdate}
              className="w-full mt-6 bg-[#38bdf8]
        hover:bg-[#0ea5e9]
        text-black font-semibold py-3 rounded-xl
        transition-all duration-300 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesHistory;
