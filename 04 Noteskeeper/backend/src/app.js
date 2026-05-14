const express = require("express");
const notesRouter = require("../routes/notes.route");
const cors = require("cors");
const userRouter = require("../routes/user.routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser())

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
app.use("/api/users", userRouter);

module.exports = app;
