const express = require("express");
const notesRouter = require("../routes/notes.route");

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/notes", notesRouter);

module.exports = app;
