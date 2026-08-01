const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

app.get("/users", (req, res) => {
  const q = "SELECT * FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result)
      res.render("users.ejs", { users: result });
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     // console.log(result.length);
//     // console.log(result[0]);
//     // console.log(result[1]);
//   });
// } catch (error) {
//   console.log(error);
// }

// connection.end();

// const getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };

// const q = "INSERT INTO user(id , username , email , password) VALUES ?";

// const data = [];

// for (let i = 1; i <= 100; i++) {
//   data.push(getRandomUser()); //100 fake users
// }
