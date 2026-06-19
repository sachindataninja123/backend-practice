const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Conncetion successfully");
  } catch (error) {
    console.log("Database connnection error", error);
  }
};


module.exports = connectToDB