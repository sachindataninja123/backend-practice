const express = require("express");
const userRouter = require("../routes/user.routes");
const postRouter = require("../routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

module.exports = app;
