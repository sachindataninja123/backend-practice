require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

if (!config.PORT) {
  throw new Error("PORT not defined in environment variables");
}
if (!config.MONGO_URL) {
  throw new Error("MONGO_URL not defined in environment variables");
}

if (!config.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY not defined in environment variables");
}

if (!config.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET not defined in environment variables");
}

module.exports = {
  config,
};
