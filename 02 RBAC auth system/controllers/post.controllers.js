const postModel = require("../models/post.model");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const post = await postModel.create({
      title,
      content,
      author: req.user._id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const post = await postModel.find().populate("author", "name email role");

    if (!post) {
      return res.status(401).json({
        message: "Post not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postModel
      .findById(req.params.id)
      .populate("author", "email name role");

    if (!post) {
      return res.status(401).json({
        message: "Post not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getPostAndUpdate = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(400).json({
        message: "Post not found!",
        success: false,
      });
    }

    // 2. Editor can only update their own posts
    if (
      req.user.role === "editor" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied — you can only edit your own posts",
        success: false,
      });
    }

    // 3. Update the post
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }, // ← returns updated document
    );

    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
        success: false,
      });
    }

    await postModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostAndUpdate,
  deletePost,
};
