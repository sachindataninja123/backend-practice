const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true },
);

const tokenBlackistModel = mongoose.model("token", tokenSchema);

module.exports = tokenBlackistModel;
