const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const genAccessToken = (userId) => {
  try {
    const genAccessToken = jwt.sign({ userId }, config.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    return genAccessToken;
  } catch (error) {
    console.log("error in generate accessToken", error);
  }
};

const genRefreshToken = (userId) => {
  try {
    const genRefreshToken = jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    return genRefreshToken;

    return genAccessToken;
  } catch (error) {
    console.log("error in generate RefreshToken", error);
  }
};

module.exports = { genAccessToken, genRefreshToken };
