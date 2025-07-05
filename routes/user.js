const express = require("express");

const { registration, login, delete_user } = require("../controllers/user");

const userRouter = express.Router();
userRouter.post("/register", registration);
userRouter.post("/login", login);
userRouter.delete("/delete_account", delete_user);

module.exports = userRouter;
