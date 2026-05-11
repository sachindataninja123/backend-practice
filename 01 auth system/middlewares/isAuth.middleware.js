const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../model/user.model");
const blacklistModel = require("../model/blacklist.model");

const isAuth = async (req, res, next) => {
  try {
    // Access token comes from Authorization header only
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized — token is missing",
        success: false,
      });
    }

    const isBlacklisted = await blacklistModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token is invalid — please login again",
        success: false,
      });
    }

    // Verify access token
    const decoded = jwt.verify(token, config.JWT_SECRET);

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
