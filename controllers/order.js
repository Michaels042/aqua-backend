let { orderModel } = require("../models/order");

// FUNCTION TO CHECK IF REQUIRED INPUTS ARE RECEIVED
let requiredInputs = (inputs, required) => {
  let error = [];
  for (let input in inputs) {
    if (inputs[input] == "" && required.includes(input)) {
      error.push(input);
    }
  }
  return error;
};

exports.handleRequestOrder = async (req, res) => {
  let error;
  let { email, address, mobile, quantity, amount, payment_type, user_id } =
    req.body;

  // recieved inputs
  let inputs = {
    user_id,
    email,
    address,
    mobile,
    quantity,
    amount,
    payment_type,
  };

  //required inputs
  let required = [
    "user_id",
    "email",
    "address",
    "mobile",
    "quantity",
    "amount",
    "payment_type",
  ];

  // Test to check if all required inputs are recieved
  error = requiredInputs(inputs, required);
  if (error.length > 0) {
    return res
      .status(400)
      .json({ status: false, message: `Please enter ${error.join(", ")}` });
  }
  //  INSERTING INTO THE DB
  let newOrder = new orderModel({
    email,
    address,
    mobile,
    quantity,
    amount,
    user_id,
    isPaid: inputs.payment_type == "card" && true,
    paidAt: inputs.payment_type == "card" ? new Date() : "",
  });

  newOrder.save((err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Opps! something went wrong, try again",
      });
    }
    res
      .status(201)
      .json({ status: true, message: "Order created successfully" });
  });
};

exports.handleGetOrderById = async (req, res) => {
  let { user_id } = req.params;
  try {
    let userOrders = await orderModel.find({ user_id });
    if (!userOrders || userOrders.length < 1) {
      return res
        .status(400)
        .json({ status: false, message: "Order history not found" });
    }
    res.status(200).json({ status: true, message: userOrders });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: " something went wrong, try again" });
  }
};
