import { Children, createContext, useState } from "react";
import BACKEND_URL from "../api/url";

export const NoteContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const createNote = async () => {
    setLoading(true);
    try {
      const res = await BACKEND_URL.post("/create");

      console.log(res.data);
    } catch (error) {
      console.log("Error creating a note : ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, createNote }}>
      {Children}
    </NoteContext.Provider>
  );
};
