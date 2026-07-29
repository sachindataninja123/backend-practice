const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

app.set(express.static(path.join(__dirname, "public")));

app.get("/" , (req, res) => {
    res.send("Server is well!")
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
