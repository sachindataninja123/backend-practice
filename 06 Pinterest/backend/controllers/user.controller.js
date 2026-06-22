const tokenBlacklistModel = require("../models/tokenBlacklist.model");
const userModel = require("../models/user.model");
const { genAccessToken, genRefreshToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;

    if (!username || !email || !password || !fullname) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
      fullname,
    });

    const safeUser = await userModel.findById(user._id).select("-password");

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      safeUser,
    });
  } catch (error) {
    console.log("register error", error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email, Password are required",
        success: false,
      });
    }

    const existUser = await userModel.findOne({ email }).select("+password");
    if (!existUser) {
      return res.status(400).json({
        message: "User does'nt exists",
        success: false,
      });
    }

    const isValidUser = await existUser.comparePassword(password);
    if (!isValidUser) {
      return res.status(400).json({
        message: "Email and Password are invalid",
        success: false,
      });
    }

    const accessToken = await genAccessToken(existUser._id);
    const refreshToken = await genRefreshToken(existUser._id);

    // 5. Refresh token → cookie only
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = await userModel
      .findById(existUser._id)
      .select("-password");

    return res.status(201).json({
      message: "User login successfully",
      success: true,
      safeUser,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log("login error", error);
  }
};

const getMeController = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("profile error  ", error);
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        message: "RefreshToken is missing!",
        success: false,
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = await genAccessToken(decoded.userId);

    return res.status(200).json({
      message: "Access token refreshed",
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const logoutController = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    await tokenBlacklistModel.create({ token: accessToken });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getSavedPostsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).populate("savedPosts");

    res.status(200).json({
      success: true,
      savedPosts: user.savedPosts,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  registerController,
  loginController,
  getMeController,
  refreshTokenController,
  logoutController,
  getSavedPostsController
};
