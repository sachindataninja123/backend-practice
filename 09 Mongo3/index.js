const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const Chat = require("./models/chat.model");

const app = express();
const PORT = 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
