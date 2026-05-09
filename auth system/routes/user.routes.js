const express = require("express");
const {
  registerController,
  loginController,
  profileController,
  refreshTokenController,
  logoutController,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/isAuth.middleware");

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/profile", isAuth, profileController);
authRouter.post("/refresh-token", refreshTokenController);
authRouter.post("/logout", isAuth, logoutController);

module.exports = authRouter;
