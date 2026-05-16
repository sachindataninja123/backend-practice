import userModel from "../models/user.model.js";
import { genAccessToken, genRefreshToken } from "../utils/generateToken.js";

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

export { registerController, loginController, profileController };
