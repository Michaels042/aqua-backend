const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//ORDER SCHEMA
const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
    },
    quantity: {
      type: String,
    },
    amount: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: "",
    },

    // user: { type: ObjectId, ref: "usermodels" },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

exports.orderModel = mongoose.model("orderDetails", orderSchema);
