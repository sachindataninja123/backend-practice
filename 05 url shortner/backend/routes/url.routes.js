import express from "express";
import {
  deleteUrlController,
  getUrlController,
  redirectUrlController,
  shortenUrlController,
  updateUrlController,
} from "../controllers/url.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js";

const urlRouter = express.Router();

urlRouter.post("/shorten", isAuth, shortenUrlController);
urlRouter.get("/:shortUrl", redirectUrlController);
urlRouter.get("/", isAuth, getUrlController);
urlRouter.put("/update/:id", isAuth, updateUrlController);
urlRouter.delete("/delete/:id", isAuth, deleteUrlController);

export default urlRouter;
