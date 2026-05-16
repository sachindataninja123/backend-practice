import jwt from "jsonwebtoken";
import config from "../config/config.js";

const genAccessToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    return accessToken;
  } catch (error) {
    console.log("Error in generate accessToken", error);
  }
};

const genRefreshToken = (userId) => {
  try {
    const refreshToken = jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    return refreshToken;
  } catch (error) {
    console.log("Error in generate refreshToken", error);
  }
};

export { genAccessToken, genRefreshToken };
