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
      user.fullname = req.body.fullname || user.fullname;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.status(201).send({
        _id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default userRouter;
