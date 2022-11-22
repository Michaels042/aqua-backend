const userModel = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {userSchema, loginSchema} = require("../utils/validatorSchema");

exports.userSignup = async (req, res) => {
  let newUser;
  try {
    newUser =  await userSchema.validateAsync(req.body);
  } catch (error) {
   return res.status(500).json({ status:false, message:error.details[0].message });
  }
  try {
    const userExist = await userModel.findOne({ email: newUser.email })
    if (userExist) {
      res.status(400).json({ status: false, message: "User already exists" });
    } else {
      const hash = bcrypt.hashSync(newUser.password);
      newUser.password = hash;
      const user = await userModel.create(newUser);
      if(!user){
        res.status(500).json({ status:false, message:"internal server errror" });
      }
      res
        .status(201)
        .json({ status: true, message: "User created successfully" });
    }
  } catch (error) {
    return res.status(404).json({ status: false, message: "Something went wrong" });
  }
};


exports.login = async (req, res) => {
  let details;
  let existingUser;
  try {
    details =  await loginSchema.validateAsync(req.body);
  } catch (error) {
   return res.status(500).json({ status:false, message:error.details[0].message});
  }
  // const { email, password } = req.body;
  // let existingUser;

  try {
    existingUser = await userModel.findOne({ email: details.email });
    if (!existingUser) {
      return res.status(404).json({status: false, message: "User does not exist" });
    }
    const isPasswordCorrect = bcrypt.compareSync(details.password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({status: false, message: "Email/password mismatched" });
    };
    
    // Create token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
      );
      
    res.status(200).json({status: true, message: 'User logged in successfully', token})
  } catch (err) {
    return res.status(400).json({status: false, message: "Opps! something went wrong" });
  }
}
