const userRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { gerAllUsers } = require("../controllers/admin/usersOrdersList");

const userController = require("../controllers/user");

const { isAuth, isAdmin } = require("../middlewares/auth");

userRouter.post("/signup", userController.userSignup);
userRouter.post("/login", userController.login);
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(userController.handleUpdate)
);
userRouter.get("/profile", isAuth, userController.handleGetUser); // to get user profile

userRouter.get("/users", isAuth, isAdmin, gerAllUsers);

module.exports = userRouter;
