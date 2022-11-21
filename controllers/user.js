exports.userLogin = async function (req, res) {
    const user = req.body;
  
    try {
      const user =  await userSchema.validateAsync(req.body);
      const existingUsher = await userModel.findOne({
        email: user.email,
      });
  
      if (existingUsher) {
        if (bcrypt.compareSync(user.password, existingUsher.password)) {
          const tokenPayload = {
            id: existingUsher._id,
            email: existingUsher.email,
          };
  
          const accessToken = jwt.sign(
            tokenPayload,
            process.env.SECRET_KEY,
            {
              expiresIn: `3d`,
            }
          );
          res.json({i
            name: user.name,
            msg: `user logged in successfully`,
            accessToken: accessToken,
          });
        } else {
          res.status(403).json({
            success: false,
            msg: "invalid password",
          });
        }
      } else {
        res.status(401).json({ success: false, msg: "user does not exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  };