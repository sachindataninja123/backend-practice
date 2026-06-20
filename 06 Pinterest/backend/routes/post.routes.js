const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const upload = require("../middlewares/multer.middleware");
const {
  createPostController,
  getAllPosts,
} = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post(
  "/create",
  isAuth,
  upload.single("image"),
  createPostController,
);
postRouter.get("/all", isAuth, getAllPosts);

module.exports = postRouter;
