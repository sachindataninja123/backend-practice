const express = require("express");
const {
  registerController,
  loginController,
  getProfileController,
  refreshTokenController,
  logoutController,
} = require("../controllers/users.controller");
const { isAuth } = require("../middlewares/isAuth.middleware");

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile", isAuth, getProfileController);
userRouter.post("/refresh-token", isAuth, refreshTokenController);
userRouter.post("/logout", isAuth, logoutController);

module.exports = userRouter;
