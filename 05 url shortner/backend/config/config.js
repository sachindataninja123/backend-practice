import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
};

if (!config.MONGO_URL) {
  throw new Error("MONGO_URL not defined in environment variables");
}

if (!config.PORT) {
  throw new Error("PORT not defined in environment variables");
}

export default config;
