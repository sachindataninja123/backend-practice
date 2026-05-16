import express from "express";
import {
  deleteUrlController,
  getUrlController,
  redirectUrlController,
  shortenUrlController,
} from "../controllers/url.controller.js";

const urlRouter = express.Router();

urlRouter.post("/shorten", shortenUrlController);

urlRouter.get("/:shortUrl", redirectUrlController);

urlRouter.get("/", getUrlController);

urlRouter.delete("/delete/:id", deleteUrlController);

export default urlRouter;
