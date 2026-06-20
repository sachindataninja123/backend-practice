const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const upload = require("../middlewares/multer.middleware");
const { createPostController } = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post(
  "/create",
  isAuth,
  upload.single("image"),
  createPostController,
);

module.exports = postRouter;
