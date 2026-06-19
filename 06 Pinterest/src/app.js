const express = require("express");
const connectToDB = require("../db/db");

const app = express();

connectToDB();

app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
