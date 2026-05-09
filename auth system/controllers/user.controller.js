const config = require("../config/config");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({
        message: "All fields required!",
      });
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User Already exists!",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "All fields required!",
      });
    }

    const isExistUser = await userModel.findOne({ email }).select("+password");

    if (!isExistUser) {
      return res.status(401).json({
        message: "Invalid email & password",
      });
    }

    const isValidUser = await isExistUser.comparePassword(password);

    if (!isValidUser) {
      return res.status(401).json({
        message: "Invalid email & password",
      });
    }

    const token = jwt.sign({ userId: isExistUser._id }, config.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged In successfully",
      user: isExistUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const profileController = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User Fetched successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { registerController, loginController ,profileController };
