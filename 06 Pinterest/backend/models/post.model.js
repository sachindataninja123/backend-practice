const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: {
      type: Number,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
