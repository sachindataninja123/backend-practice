const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
require("dotenv").config();

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});


const getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

const q = "INSERT INTO user(id , username , email , password) VALUES ?";

const data = [];

for (let i = 1; i <= 100; i++) {
  data.push(getRandomUser()); //100 fake users
}

try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
    // console.log(result.length);
    // console.log(result[0]);
    // console.log(result[1]);
  });
} catch (error) {
  console.log(error);
}

connection.end();


