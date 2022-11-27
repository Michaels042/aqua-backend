const orderRoutes = require("express").Router();

// USER CONTROLLERS AND MIDDLEWARES
const {
  handleRequestOrder,
  handleGetOrderById,
} = require("../controllers/order");

const { gerAllOrders } = require("../controllers/admin/usersOrdersList");
const { isAuth, isAdmin } = require("../middlewares/auth");

//ROUTES
//User login route
orderRoutes.post("/order", isAuth, handleRequestOrder);

orderRoutes.get("/order/history/:user_id", isAuth, handleGetOrderById);
orderRoutes.get("/orders", isAuth, isAdmin, gerAllOrders);

module.exports = orderRoutes;
