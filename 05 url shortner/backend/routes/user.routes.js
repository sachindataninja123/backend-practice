import express from "express";
import {
  loginController,
  logoutController,
  profileController,
  refreshTokenController,
  registerController,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile", isAuth, profileController);
userRouter.post("/logout", isAuth, logoutController);
userRouter.post("/refresh-token", isAuth, refreshTokenController);

export default userRouter;
