import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is started from order service!!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
