const express = require("express");
const expressAsyncHandler = require("express-async-handler");
import User from "./userModel.js";
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

// Updating User Profile
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.email = user.email;
      user.fullName = req.body.fullName || user.fullName;
      user.mobile = req.body.mobile || user.mobile;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.status(201).send({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default userRouter;
