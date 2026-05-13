import { createContext, useState } from "react";
import BACKEND_URL from "../api/url";
import { useCallback } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const createNote = async (noteData) => {
    setLoading(true);
    try {
      const res = await BACKEND_URL.post("/create", noteData);

      setNotes((prev) => [res.data.note, ...prev]);
    } catch (error) {
      console.log("Error creating a note : ", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllNotes = useCallback(async () => {
    setLoading(true);

    try {
      const res = await BACKEND_URL.get("/");

      setNotes(res.data.notes);
    } catch (error) {
      console.log("Error Fetching notes :", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNote = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await BACKEND_URL.put(`/update-note/${id}`, updatedData);

      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data.note : note)),
      );
    } catch (error) {
      console.log("Notes Updating error :", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setLoading(true);
    try {
      const res = await BACKEND_URL.delete(`/delete/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Notes deleting error : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, createNote, getAllNotes, updateNote, deleteNote , loading }}
    >
      {children}
    </NotesContext.Provider>
  );
};
