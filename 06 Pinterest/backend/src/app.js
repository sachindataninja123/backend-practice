const express = require("express");
const userRouter = require("../routes/user.routes");
const postRouter = require("../routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

module.exports = app;
