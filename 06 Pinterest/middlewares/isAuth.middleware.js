const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Unauthorized - token is missing!",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // Find user, exclude password
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = isAuth;
