const userRouter = require("express").Router()
const expressAsyncHandler = require("express-async-handler");


const userController = require("../controllers/user")

const {isAuth} = require('../middlewares/auth')


userRouter.post("/signup", expressAsyncHandler(userController.userSignup));
userRouter.post("/login", userController.login);
userRouter.post("/profile", isAuth, userController.handleUpdate);


module.exports = userRouter; 
