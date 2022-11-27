let { orderModel } = require("../../models/order");

exports.ConfirmPayment = async (req, res) => {
  let orderId = req.params.order_id;

  try {
    let updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { isPaid: true, paidAt: new Date() },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        status: false,
        message: "Failed to confirm payment. No order found.",
      });
    }
    res.status(200).json({ status: true, message: "payment confirmed." });
  } catch (error) {
    res
      .Status(500)
      .json({ status: false, message: "Opps! something went wrong" });
  }
};

exports.ConfirmDelivery = async (req, res) => {
  let orderId = req.params.order_id;

  try {
    let updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { isDelivered: true },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        status: false,
        message: "Failed to update delivery status. No order found.",
      });
    }
    res
      .status(200)
      .json({ status: true, message: "delivery status confirmed." });
  } catch (error) {
    res
      .Status(500)
      .json({ status: false, message: "Opps! something went wrong" });
  }
};
