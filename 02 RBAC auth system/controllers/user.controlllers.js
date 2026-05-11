const config = require("../config/config");
const blacklistModel = require("../models/blackList.model");
const userModel = require("../models/user.model");
const { genAccessToken, genRefreshToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required!",
        success: false,
      });
    }

    const isExistUser = await userModel.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({
        message: "User already exists!",
        success: false,
      });
    }

    // 3. Create user
    const user = await userModel.create({ name, email, password });

    // 4. Exclude password from response
    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: safeUser,
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
        message: "All fields required!",
        success: false,
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
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

    // 4. Exclude password from response
    const { password: _, ...safeUser } = user.toObject();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: user,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const profileController = async (req, res) => {
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
      return res.status(401).json({
        message: "Refresh token missing",
        success: false,
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY);
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
    const accessToken = req.headers.authorization?.split(" ")[1];

    await blacklistModel.create({ token: accessToken });

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

module.exports = {
  registerController,
  loginController,
  profileController,
  logoutController,
  refreshTokenController
};
