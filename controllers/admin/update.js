const userModel = require("../../models/user");

const bcrypt = require("bcryptjs");

exports.handleAdminUpdateUser = async (req, res) => {
    try{
    let user = {
      email: req.body.email,
      fullName: req.body.fullName,
      mobile: req.body.mobile,
      role: req.body.role,
      tankSize: req.body.tankSize,
    }
    
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
    }
    
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, user, {new: true} );
      if(updatedUser) {
        res.status(200).json({ success: true, message: "User updated successfully", updatedUser})
      } else {
        res.status(404).json({ success: false, message: "User not found" })
      }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Sommething went wrong", 
            error 
        })
    }
  };

exports.handleAdminDeleteUser = async (req, res) => {
    try {
    const user = await userModel.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ status: false, message: "User not found" });
}

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
} catch (error) {
    res.status(500).json({ 
        success: false, 
        message: "Sommething went wrong", 
        error 
    })
}
}




// exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
//     const user = await User.findById(req.params.id);
  
//     if (!user) {
//       return next(
//         new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
//       );
//     }
  
//     const imageId = user.avatar.public_id;
  
//     await cloudinary.v2.uploader.destroy(imageId);
  
//     await user.remove();
  
//     res.status(200).json({
//       success: true,
//       message: "User Deleted Successfully",
//     });
//   });
  






























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
  