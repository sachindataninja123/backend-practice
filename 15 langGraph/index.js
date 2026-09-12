import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ChatGroq } from "@langchain/groq";
import {
  Annotation,
  MemorySaver,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

const checkPointer = new MemorySaver();

const tools = [tool];
const toolNode = new ToolNode(tools);

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.7,
  maxTokens: 100,
  maxRetries: 2,
}).bindTools(tools);

const invokeLLM = async (state) => {
  console.log("state is : ", state);

  const response = await llm.invoke([
    {
      role: "system",
      content: `you are jarvis AI assistant 
        Use conversation memory first.
        
        Only use tools when the answer requires external real-time information like: weather, news, web search, stock prices etc. 
        
        Do Not call tools for simple conversation memory-based questions, greetings, or personal context
        `,
    },
    ...state.messages,
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
  .compile({ checkpointer: checkPointer });

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const response = await graph.invoke(
    {
      messages: [{ role: "user", content: input }],
    },
    { configurable: { thread_id: "user123" } },
  );

  console.log(response);

  return res.status(200).json({
    "AI:": response,
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
