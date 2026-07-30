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

const q =
  "INSERT INTO user(id , username , email , password) VALUES ?";
let users = [
  ["1234", "123_new_Userb", "newUserb@gmail.com", "12345678b"],
  ["1235", "123_new_Userc", "newUserc@gmail.com", "12345678c"],
];

try {
  connection.query(q, [users], (err, result) => {
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

const getRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
