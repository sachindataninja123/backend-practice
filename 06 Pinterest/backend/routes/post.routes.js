const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const upload = require("../middlewares/multer.middleware");
const {
  createPostController,
  getAllPosts,
  getMyPosts,
  getSinglePost,
  savePostController,
  deletePostController,
} = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post(
  "/create",
  isAuth,
  upload.single("image"),
  createPostController,
);

postRouter.get("/all", getAllPosts);
postRouter.get("/mypost", isAuth, getMyPosts);
postRouter.get("/:id", getSinglePost);

postRouter.post("/save/:postId", isAuth, savePostController);
postRouter.delete("/delete/:postId", isAuth, deletePostController);

module.exports = postRouter;
