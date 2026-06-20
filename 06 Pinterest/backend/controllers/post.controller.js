const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { post } = require("../routes/user.routes");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const post = await postModel.create({
      title,
      description,
      image: req.file.filename,
      user: req.user.id,
    });

    await userModel.findByIdAndUpdate(req.user.id, {
      $push: {
        posts: post._id,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("user", "fullname username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createPostController , getAllPosts};
