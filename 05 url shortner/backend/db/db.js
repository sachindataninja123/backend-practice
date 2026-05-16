import mongoose from "mongoose";
import config from "../config/config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

export default connectToDB;
