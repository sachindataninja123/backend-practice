const jwt = require("jsonwebtoken");
const express = require("express");

const genAccessToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET);
    return accessToken;
  } catch (error) {
    console.log("access Token error", error);
  }
};

const genRefreshToken = (userId) => {
  try {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET);
    return refreshToken;
  } catch (error) {
    console.log("access Token error", error);
  }
};

module.exports = { genAccessToken, genRefreshToken };
