import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

if (!config.MONGO_URL) {
  throw new Error("MONGO_URL not defined in environment variables");
}

if (!config.PORT) {
  throw new Error("PORT not defined in environment variables");
}

if (!config.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined in environment variables");
}

if (!config.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET not defined in environment variables");
}

export default config;
