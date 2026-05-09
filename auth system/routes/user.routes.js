const express = require("express");
const {
  registerController,
  loginController,
  profileController,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/isAuth.middleware");

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/profile", isAuth, profileController);

module.exports = authRouter;
