import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
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

const blacklistTokenModel = mongoose.model("token", blacklistSchema);

export default blacklistTokenModel;
