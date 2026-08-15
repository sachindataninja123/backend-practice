import express from "express";
import dotenv from "dotenv";
import connectoDB from "./db/db.js";
import User from "./models/user.model.js";
dotenv.config();
import { Redis } from "ioredis";
import rateLimitter from "./middleware/ratelimit.middleware.js";
import sendEmail from "./utils/sendEmail.js";
import emailQueue from "./queue.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

export const redis = new Redis(process.env.REDIS_URL);

connectoDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from redis!!" });
});

app.post("/create", async (req, res) => {
  const { username, email, phone } = req.body;

  await redis.del("user:all");
  const user = await User.create({
    username,
    email,
    phone,
  });

  await emailQueue.add("send-email", { email });
  
  return res.status(200).json(user);
});

app.get("/users", rateLimitter, async (req, res) => {
  const user = await User.find({});

  return res.status(200).json(user);
});

app.get("/users-with-redis", async (req, res) => {
  const cached = await redis.get("user:all");

  if (cached) {
    const user = JSON.parse(cached);
    return res.status(200).json(user);
  }

  const user = await User.find({});
  await redis.set("user:all", JSON.stringify(user));

  return res.status(200).json(user);
});

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(`otp:${email}`, otp, "EX", 60);

  return res.status(201).json({
    otp: otp,
  });
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const cachedOtp = await redis.get(`otp:${email}`);
  if (!cachedOtp) {
    return res.status(400).json({ message: "Otp is expired or not found!" });
  }

  if (cachedOtp !== otp) {
    return res.status(400).json({ message: "Otp mismatch error!" });
  }

  await redis.del(`otp:${email}`);

  return res.status(200).json({ message: "Otp verified!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
