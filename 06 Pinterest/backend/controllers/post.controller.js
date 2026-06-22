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

const getMyPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({ user: req.user._id })
      .populate("user", "fullname username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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

const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        message: "Post not found!",
        success: false,
      });
    }

    const post = await postModel.findById(postId).populate("user")

    return res.status(200).json({
      message: "single post fetched",
      success: true,
      post,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const savePostController = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  const user = await userModel.findById(userId);

  if (user.savedPosts.includes(postId)) {
    return res.status(400).json({
      success: false,
      message: "Post already saved",
    });
  }

  user.savedPosts.push(postId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Post saved successfully",
  });
};

const deletePostController = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  // Check ownership
  if (post.user.toString() !== userId) {
    return res.status(403).json({
      success: false,
      message: "You can only delete your own posts",
    });
  }

  await postModel.findByIdAndDelete(postId);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
};

module.exports = { createPostController, getMyPosts, getAllPosts , getSinglePost, savePostController , deletePostController };
