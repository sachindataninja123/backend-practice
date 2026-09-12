import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { ChatGroq } from "@langchain/groq"

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());


const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.7,
  maxTokens: 100,
  maxRetries: 2,
});

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const response = await llm.invoke([
    {
      role: "system",
      content:
        "you are a assistant and your name is jarvis. if you don,t know the answer then don't give incorrect answer",
    },
    {
      role: "human",
      content: input,
    },
  ]);

  return res.status(200).json({
    "AI:": response.content,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
