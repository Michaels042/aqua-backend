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
