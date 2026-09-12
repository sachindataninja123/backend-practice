import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ChatGroq } from "@langchain/groq";
import {
  Annotation,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.7,
  maxTokens: 100,
  maxRetries: 2,
});

const tools = [];
const toolNode = new ToolNode(tools);

const invokeLLM = async (state) => {
  console.log("state is : ", state);

  const response = await llm.invoke([
    {
      role: "system",
      content:
        "you are a assistant and your name is jarvis. if you don,t know the answer then don't give incorrect answer",
    },
    {
      role: "human",
      content: state.messages[0].content,
    },
  ]);

  return { messages: [response] };
};

const shouldContinue = async (state) => {
  const lastMessage = state.messages[state.messages.length - 1];

  if (lastMessage.tool_calls.length > 0) {
    return "tools";
  } else {
    return "__end__";
  }
};

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", invokeLLM)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .compile();

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const response = await graph.invoke({
    messages: [{ role: "user", content: input }],
  });
  console.log(response);

  return res.status(200).json({
    "AI:": response.messages[response.messages.length - 1].content,
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
