const userModel = require("../models/user");
const expressAsyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { userSchema, loginSchema } = require("../utils/validatorSchema");

// Updating User Profile
exports.handleUpdate = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (user) {
    user.email = user.email;
    user.fullName = req.body.fullName || user.fullName;
    user.mobile = req.body.mobile || user.mobile;

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password);
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
};
//   ..................................................................

// exports.updateUser = async (req, res, next) => {
//     try {
//      const update = req.body
//      const userId = req.params.userId;
//      await User.findByIdAndUpdate(userId, update);
//      const user = await User.findById(userId)
//      res.status(200).json({
//       data: user,
//       message: 'User has been updated'
//      });
//     } catch (error) {
//      next(error)
//     }
//    }
