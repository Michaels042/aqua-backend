let { orderModel } = require("../../models/order");
const userModel = require("../../models/user");

//Getting All User
exports.getAllUsers = async (req, res) => {
  let users;
  try {
    users = await userModel.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ status: false, message: "Users Not Found" });
  } else {
    return res.status(200).json({ users });
  }
};

//To get all orders

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
