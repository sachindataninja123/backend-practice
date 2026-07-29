const express = require("express");
const path = require("path");

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/health", (req, res) => {
  res.send("server is live!");
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { diceVal });
});

app.get("/insta/:username", (req, res) => {
  const {username} = req.params;
  const instaData = require("./data.json");
  const data = instaData[username];
  if(!data){
    res.send("Data not found!")
  }
  console.log(data)
  res.render("instagram.ejs", { data });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
