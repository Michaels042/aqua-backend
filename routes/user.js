const userRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");

// USER CONTROLLERS
const userController = require("../controllers/user");

// ADMIN CONTROLLERS
const {
  handleAdminUpdateUser,
  handleAdminDeleteUser,
} = require("../controllers/admin/update");

// MIDDLEWARES
const { isAuth, isAdmin } = require("../middlewares/auth");

userRouter.post("/signup", userController.userSignup);
userRouter.post("/login", userController.login);
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(userController.handleUpdate)
);
// USER ROUTES
userRouter.get("/profile", isAuth, userController.handleGetUser); // to get user profile

// ADMIN ROUTES
userRouter.put("/profile/update/:id", isAuth, isAdmin, handleAdminUpdateUser); // to update user profile
userRouter.delete("/profile/delete/:id", isAuth, isAdmin, handleAdminDeleteUser); // to delete user profile

module.exports = userRouter;
