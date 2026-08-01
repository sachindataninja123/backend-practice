const express = require("express");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

app.get("/", (req, res) => {
  const q = "SELECT count(*) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      const count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (error) {
    console.log(error);
  }
});

// Show all users
app.get("/users", (req, res) => {
  const q = "SELECT * FROM user";

  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("users.ejs", { users });
  });
});

// Edit page
app.get("/users/:id/edit", (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM user WHERE id=?";

  connection.query(q, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("edit.ejs", {
      user: results[0],
    });
  });
});

// Update username
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const q = "UPDATE user SET username=? WHERE id=?";

  connection.query(q, [username, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    console.log(result);

    res.redirect("/users");
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});