const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blackList.model");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token is missing",
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

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
        success: false,
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// middleware/authorizeRole.js
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by isAuth middleware
    // so isAuth must always run before authorizeRole
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized — please login first",
        success: false,
      });
    }

    // check if user's role is in the allowed roles list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied — required role: ${allowedRoles.join(" or ")}`,
        success: false,
      });
    }

    next();
  };
};

module.exports = { isAuth, authorizeRole };
