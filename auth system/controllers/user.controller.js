const config = require("../config/config");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { genAccessToken, genRefreshToken } = require("../utils/generateToken");
const blacklistModel = require("../model/blacklist.model");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required!",
        success: false,
      });
    }

    // 2. Check existing user
    const existUser = await userModel.findOne({ email });
    if (existUser) {
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

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields required!",
        success: false,
      });
    }

    // 2. Find user
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // 3. Compare password
    const isValidUser = await user.comparePassword(password);
    if (!isValidUser) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // 4. Generate tokens
    const accessToken = genAccessToken(user._id);
    const refreshToken = genRefreshToken(user._id);

    // 5. Refresh token → cookie only
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 6. Exclude password from response
    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: safeUser, // no password
      accessToken, // access token only, no refresh token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const profileController = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: req.user, // password already excluded in isAuth middleware
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
  refreshTokenController,
  logoutController,
};
