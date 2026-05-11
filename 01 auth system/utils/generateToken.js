const jwt = require("jsonwebtoken");
const config = require("../config/config");

const genAccessToken =  (userId) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: "15m" });
  return token;
};

const genRefreshToken =  (userId) => {
  const token = jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = { genAccessToken, genRefreshToken };
