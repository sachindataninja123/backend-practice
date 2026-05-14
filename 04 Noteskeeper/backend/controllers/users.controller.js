const { config } = require("../config/config");
const tokenBlackistModel = require("../models/tokenBlacklist.model");
const userModel = require("../models/user.model");
const { genAccessToken, genRefreshToken } = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email, password are required!",
        success: false,
      });
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User Already exists!",
        success: false,
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email, password are required!",
        success: false,
      });
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User does not exists!",
        success: false,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email & password!",
        success: false,
      });
    }

    const accessToken = genAccessToken(user._id);
    const refreshToken = genRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });

    return res.status(201).json({
      message: "User Logged In successfully",
      success: true,
      user,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getProfileController = async (req, res) => {
  try {
    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token missing",
        success: false,
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    const accessToken = genAccessToken(decoded.userId);

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
    const accessToken = req.headers.authorization.split(" ")[1];

    await tokenBlackistModel.create({ token: accessToken });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  registerController,
  loginController,
  getProfileController,
  refreshTokenController,
  logoutController,
};
