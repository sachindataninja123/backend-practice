const express = require("express");
const { registerController } = require("../controllers/users.controller");

const userRouter = express.Router();

userRouter.post("/register", registerController);

module.exports = userRouter;
