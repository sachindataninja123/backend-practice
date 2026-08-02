const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const Chat = require("./models/chat.model");
const methodOverride = require("method-override");

const app = express();
const PORT = 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("connection successfull!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", async (req, res) => {
  res.send("server is connected!");
});

//index route
app.get("/chats", async (req, res) => {
  const chats = await Chat.find();
  res.render("chats.ejs", { chats });
});

// new route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create Routes
app.post("/chats", async (req, res) => {
  let { to, from, message } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });
  await newChat.save();
  res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  const chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//update Route
app.patch("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { $set: { message } },
    { runValidators: true },
    { new: true },
  );

  res.redirect("/chats");
});

//update Route
app.delete("/chats/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);

  res.redirect("/chats");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
