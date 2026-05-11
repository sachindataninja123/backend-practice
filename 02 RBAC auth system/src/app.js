const express = require("express");
const userRouter = require("../routes/user.routes");
const cookieParser = require("cookie-parser");
const postRouter = require("../routes/post.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is connected");
});

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

module.exports = app;
