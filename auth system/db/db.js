const mongoose = require("mongoose");
const config = require("../config/config");

const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

module.exports = connectDb;
