const orderRoutes = require("express").Router();

// USER CONTROLLERS AND MIDDLEWARES
const { handleRequestOrder, handleGetOrderById } = require("../controllers/order");
// const { Authorized } = require('../middlewares/Authorization')

//ROUTES
//User login route
orderRoutes.post("/order", /*Add middlewares,*/ handleRequestOrder);

orderRoutes.get("/order/history/:user_id", /*Add middlewares,*/ handleGetOrderById);



module.exports = orderRoutes;
