const orderRoutes = require("express").Router();

// USER CONTROLLERS AND MIDDLEWARES
const {
  handleRequestOrder,
  handleGetOrderById,
} = require("../controllers/order");
const { isAuth } = require("../middlewares/auth");

//ROUTES
//User login route
orderRoutes.post("/order", isAuth, handleRequestOrder);

orderRoutes.get("/order/history/:user_id", isAuth, handleGetOrderById);

module.exports = orderRoutes;
