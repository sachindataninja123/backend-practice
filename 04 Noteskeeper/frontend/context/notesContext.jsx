import { createContext, useState } from "react";
import BACKEND_URL from "../api/url";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const createNote = async (noteData) => {
    setLoading(true);
    try {
      const res = await BACKEND_URL.post("/create", noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) => [res.data.note, ...prev]);

      toast.success(res.data.message);
    } catch (error) {
      console.log("Notes created error", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllNotes = useCallback(async () => {
    setLoading(true);

    try {
      const res = await BACKEND_URL.get("/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data.notes);
      toast.success(res.data.success);
    } catch (error) {
      console.log("Notes fetch error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNote = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await BACKEND_URL.put(`/update-note/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data.note : note)),
      );

      toast.success(res.data.success);
    } catch (error) {
      console.log("Notes update error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setLoading(true);
    try {
      const res = await BACKEND_URL.delete(`/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success(res.data.message);
    } catch (error) {
      console.log("Notes deleted error", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     getAllNotes();
  //   } else {
  //     setNotes([]);
  //   }
  // }, [token]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        createNote,
        getAllNotes,
        updateNote,
        deleteNote,
        loading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
