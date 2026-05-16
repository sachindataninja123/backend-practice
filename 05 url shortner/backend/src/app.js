import express from "express";
import urlRouter from "../routes/url.routes.js";
import userRouter from "../routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server connected");
});

app.use("/api/url", urlRouter);
app.use("/api/users", userRouter);

export default app;
