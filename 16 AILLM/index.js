import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// const main = async () => {
//   // WHOLE CONTENT AFTER GENERATION

//   const res = await ai.interactions.create({
//     model: "gemini-3.5-flash-lite",
//     input: "hello",
//   });

//   console.log(res.output_text);

//   // AFTER STREAMING

//   //   const stream = await ai.interactions.create({
//   //     model: "gemini-3.5-flash-lite",
//   //     input: "Explain how AI works",
//   //     stream: true,
//   //   });

//   //   for await (const event of stream) {
//   //     console.log(event);
//   //   }
// };

// main();

app.post("/test-gemini", async (req, res) => {
  const { prompt } = req.body;

  const response = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: prompt,
  });

  res.status(200).json({
    success: true,
    data: response.output_text,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
