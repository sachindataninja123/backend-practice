require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables");
}
if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}
if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}
if (!JWT_REFRESH_SECRET_KEY) {
  throw new Error(
    "JWT_REFRESH_SECRET_KEY is not defined in environment variables",
  );
}

const config = {
  PORT,
  MONGO_URL,
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
};

module.exports = config;
