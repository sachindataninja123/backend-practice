const userModel = require("../models/user.model");

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

module.exports = {registerController}
