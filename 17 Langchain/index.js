import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ChatGoogle } from "@langchain/google";
import { TavilySearch } from "@langchain/tavily";
import { createAgent } from "langchain";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

// AI AGENT

const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

const model = new ChatGoogle("gemini-3.5-flash-lite");

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const agent = createAgent({
    model,
    tools: [tool],
  });

  const response = await agent.invoke({
    messages: [
      {
        role: "human",
        content: prompt,
      },
    ],
  });

  // console.log(response)
  // console.log(response.messages[response.messages.length - 1].content)

  res.status(200).json({
    success: true,
    data: response.messages[response.messages.length - 1].content,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
