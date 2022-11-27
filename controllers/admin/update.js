const userModel = require("../../models/user");

const bcrypt = require("bcryptjs");

exports.handleAdminUpdateUser = async (req, res) => {
    const user = await userModel.findById(req.user.id);
    if (user) {
      user.email = user.email;
      user.fullName = req.body.fullName || user.fullName;
      user.mobile = req.body.mobile || user.mobile;
      user.role = req.body.role || user.role;
      user.tankSize = req.body.tankSize || user.tankSize;
  
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
  
      const updatedUser = await user.findByIdAndUpdate(req.params.id, user);
      res.status(201).send({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        role: updatedUser.role,
        tankSize: updatedUser.tankSize,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ 
        status: false, 
        message: "User not found" 
    });
    }
  };

exports.handleAdminDeleteUser = async (req, res) => {
    const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(404).json({ status: false, message: "User not found" });
}
  await user.findByIdAndDelete(req.params.id, user);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
}



































//   exports.handleAdminUpdateDriver = async (req, res) => {
//     const driver = await driverModel.findById(req.driver.id);
//     if (driver) {
//       driver.email = driver.email;
//       driver.fullName = req.body.fullName || driver.fullName;
//       driver.mobile = req.body.mobile || driver.mobile;
  
//       if (req.body.password) {
//         driver.password = bcrypt.hashSync(req.body.password, 8);
//       }
  
//       const updateDriver = await driver.findByIdAndUpdate(req.params.id, driver);
//       res.status(201).send({
//         _id: updateDriver._id,
//         fullName: updateDriver.fullName,
//         email: updateDriver.email,
//         mobile: updateDriver.mobile,
//         isAdmin: updateDriver.isAdmin,
//       });
//     } else {
//       res.status(404).send({ message: "User not found" });
//     }
//   };


//   exports.updateUserRole = async (req, res) => {
//       try{
//         const user = await userModel.findById(req.user.id);
//         const newUserData = {
//           email: req.body.email,
//           role: req.body.role,
//         };
//     await user.findByIdAndUpdate(req.params.id, newUserData);
  
//     res.status(200).json({
//       success: true,
//       message: "Updated successfully!"
//     })
//   } catch {
//         res.status(200).json({success: false, message: "Something went wrong!"})
//     };
//   };

//   exports.updateDriverRole = async (req, res) => {
//     try{
//       const driver = await driverModel.findById(req.driver.id);
//       const newDriverData = {
//         email: req.body.email,
//         role: req.body.role,
//       };
//   await driver.findByIdAndUpdate(req.params.id, newDriverData);

//   res.status(200).json({
//     success: true,
//     message: "Updated successfully!"
//   })
// } catch {
//       res.status(200).json({success: false, message: "Something went wrong!"})
//   };
// };
  