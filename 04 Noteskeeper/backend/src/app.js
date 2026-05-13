const express = require("express");
const notesRouter = require("../routes/notes.route");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/notes", notesRouter);

module.exports = app;
