const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const {userSchema} = require("./utils/validatorSchema");

exports.userSignup = async (req, res) => {
  try {
    const newUser =  await userSchema.validateAsync(req.body);
    const userExist = await UserModel.findOne({ email: newUser.email });
    if (userExist) {
      res.status(400).json({ status: false, message: "User already exists" });
    } else {
      const hash = bcrypt.hashSync(newUser.password);
      newUser.password = hash;
      const user = await UserModel.create(newUser);
      console.log("Created User Data", user);
      res
        .status(201)
        .json({ status: true, message: "User created successfully" });
    }
  } catch (error) {
    return res.status(404).json({ status: false, message: "Something went wrong" });
  }
};

