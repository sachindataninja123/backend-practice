const express = require("express");
const {
  createNotes,
  getAllNotes,
  updateNotes,
  deleteNote,
} = require("../controllers/notes.controller");

const notesRouter = express.Router();

notesRouter.post("/create", createNotes);
notesRouter.get("/", getAllNotes);
notesRouter.put("/update-note/:id", updateNotes);
notesRouter.delete("/delete/:id", deleteNote);

module.exports = notesRouter;
