import config from "../config/config.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import { genAccessToken, genRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).json({
        message: "name , email, password are required",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(404).json({
        message: "User already exists",
        success: false,
      });
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User register successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "email, password are required",
        success: false,
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User doesn't exists",
        success: false,
      });
    }

    const isValidUser = await user.comparePassword(password);
    if (!isValidUser) {
      return res.status(400).json({
        message: "email & password are invalid",
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

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const profileController = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    await blacklistTokenModel.create({ token: accessToken });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User logged out successfully",
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token is invalid",
        success: false,
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    const accessToken = genAccessToken(decoded.userId);

    return res.status(200).json({
      message: "AccessToken token refreshed",
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerController,
  loginController,
  profileController,
  logoutController,
  refreshTokenController
};
