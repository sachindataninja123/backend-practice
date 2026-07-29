const express = require("express");
const path = require("path");
const posts = require("./data");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/posts", (req, res) => {
  const data = require("./data");
  res.render("index.ejs", { data });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;
  const post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.render("edit.ejs", { post });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
