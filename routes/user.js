const userRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");

const userController = require("../controllers/user");

const { isAuth } = require("../middlewares/auth");

userRouter.post("/signup", userController.userSignup);
userRouter.post("/login", userController.login);
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(userController.handleUpdate)
);

module.exports = userRouter;
