const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const userModel = require("../models/user.model");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Token is missing , please login again",
        success: false,
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User no longer exists!",
        success: false,
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.log("isAuth middleware error: ", error);
  }
};

module.exports = { isAuth };
