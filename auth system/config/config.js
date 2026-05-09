require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not declared in environment variables");
}
if (!PORT) {
  throw new Error("PORT is not declared in environment variables");
}
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not declared in environment variables");
}

const config = {
  MONGO_URL,
  PORT,
  JWT_SECRET,
};

module.exports = config;
