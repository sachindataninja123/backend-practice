require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
};

if (!config.PORT) {
  throw new Error("PORT not defined in environment variables");
}
if (!config.MONGO_URL) {
  throw new Error("MONGO_URL not defined in environment variables");
}

module.exports = {
  config,
};
