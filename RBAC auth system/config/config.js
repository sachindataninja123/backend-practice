require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables");
}
if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

const config = {
  PORT,
  MONGO_URL,
};

module.exports = config;
