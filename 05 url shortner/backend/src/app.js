import express from "express";
import urlRouter from "../routes/url.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server connected");
});

app.use("/api/url", urlRouter);

export default app;
