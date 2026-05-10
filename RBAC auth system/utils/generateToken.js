const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const genAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, config.JWT_SECRET_KEY, {
    expiresIn: "15m",
  });

  return accessToken;
};

const genRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, config.JWT_REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  return refreshToken;
};

module.exports = { genAccessToken, genRefreshToken };
