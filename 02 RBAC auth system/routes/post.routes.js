const express = require("express");
const { isAuth, authorizeRole } = require("../middlewares/isAuth.middlewares");
const {
  createPost,
  getAllPosts,
  getPostById,
  getPostAndUpdate,
  deletePost,
} = require("../controllers/post.controllers");

const postRouter = express.Router();

postRouter.post(
  "/create",
  isAuth,
  authorizeRole("editor", "admin"),
  createPost,
);

postRouter.get(
  "/posts",
  isAuth,
  authorizeRole("editor", "admin", "viewer"),
  getAllPosts,
);

postRouter.get(
  "/posts/:id",
  isAuth,
  authorizeRole("admin", "editor"),
  getPostById,
);

postRouter.put(
  "/update/:id",
  isAuth,
  authorizeRole("editor", "admin"),
  getPostAndUpdate,
);

postRouter.delete("/delete/:id", isAuth, authorizeRole("admin"), deletePost);

module.exports = postRouter;
