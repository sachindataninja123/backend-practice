import express from "express";
import dotenv from "dotenv";
import connectoDB from "./db/db.js";
import User from "./models/user.model.js";
dotenv.config();
import { Redis } from "ioredis";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL);

connectoDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from redis!!" });
});

app.post("/create", async (req, res) => {
  const { username, email, phone } = req.body;
  const user = await User.create({
    username,
    email,
    phone,
  });

  return res.status(200).json(user);
});

app.get("/users", async (req, res) => {
  const user = await User.find();

  return res.status(200).json(user);
});

app.get("/users-with-redis", async (req, res) => {
  const cached = await redis.get("username:all");

  if (cached) {
    return res.status(200).json(user);
  }

  const user = await User.find();
  await redis.set("username:all", JSON.stringify(user));

  return res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
