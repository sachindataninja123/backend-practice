import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).json({
        message: "Token is missing, please login again",
        success: false,
      });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });
    if (isBlackListed) {
      return res.status(401).json({
        message: "Token is invalid — please login again",
        success: false,
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User no longer exists",
        success: false,
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default isAuth;
