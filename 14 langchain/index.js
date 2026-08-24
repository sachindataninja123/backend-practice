import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 8000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: input,
  });

  return res.status(200).json({
    "AI:": response,
  });
});

app.get("/", (req, res) => {
  res.send(200).json({
    "message" : "Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
