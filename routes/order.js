const orderRoutes = require("express").Router();

// USER CONTROLLERS
const {
  handleRequestOrder,
  handleGetOrderById,
} = require("../controllers/order");

const { gerAllOrders } = require("../controllers/admin/usersOrdersList");

//MIDDLEWARES
const { isAuth, isAdmin } = require("../middlewares/auth");

// ADMIN CONTROLLERS
const {
  ConfirmPayment,
  ConfirmDelivery,
} = require("../controllers/admin/confirmation");

//ROUTES
//User login route
orderRoutes.post("/order", isAuth, handleRequestOrder);

orderRoutes.get("/order/history/:user_id", isAuth, handleGetOrderById);
orderRoutes.get("/orders", isAuth, isAdmin, gerAllOrders);
orderRoutes.get("/order/history", isAuth, handleGetOrderById);

//ROUTES
//ADMIN ROUTES
orderRoutes.put("/order/payment/:order_id", isAuth, isAdmin, ConfirmPayment);
orderRoutes.put("/order/delivery/:order_id", isAuth, isAdmin, ConfirmDelivery);

module.exports = orderRoutes;
