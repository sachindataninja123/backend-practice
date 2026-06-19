const userModel = require("../models/user.model");
const { genAccessToken, genRefreshToken } = require("../utils/generateToken");

const register = async (req, res) => {
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
      dp,
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

const login = async (req, res) => {
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

    const isValidUser = await existUser.comparePassword(existUser.password);
    if (!isValidUser) {
      return res.status(400).json({
        message: "  Email and Password are invalid",
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

const login = async (req, res) => {
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

    const isValidUser = await existUser.comparePassword(existUser.password);
    if (!isValidUser) {
      return res.status(400).json({
        message: "  Email and Password are invalid",
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
