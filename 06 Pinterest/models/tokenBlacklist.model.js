const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const tokenBlacklistModel = mongoose.model("token", tokenSchema);

module.exports = tokenBlacklistModel;
