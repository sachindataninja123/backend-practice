const express = require("express");
const {
  createNotes,
  getAllNotes,
  updateNotes,
  deleteNote,
} = require("../controllers/notes.controller");
const { isAuth } = require("../middlewares/isAuth.middleware");

const notesRouter = express.Router();

notesRouter.post("/create", isAuth, createNotes);
notesRouter.get("/", isAuth, getAllNotes);
notesRouter.put("/update-note/:id", isAuth, updateNotes);
notesRouter.delete("/delete/:id", isAuth, deleteNote);

module.exports = notesRouter;
