const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const upload = require("../middlewares/multer.middleware");
const {
  createPostController,
  getAllPosts,
  getMyPosts,
} = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post(
  "/create",
  isAuth,
  upload.single("image"),
  createPostController,
);
postRouter.get("/mypost", isAuth, getMyPosts);
postRouter.get("/all", getAllPosts);

module.exports = postRouter;
