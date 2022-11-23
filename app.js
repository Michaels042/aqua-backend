const express = require("express");
const app = express();
const userRouter = require("./routes/user")

const orderRoutes = require("./routes/order")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRouter)
app.use("/user", orderRoutes) // ROUTES FOR USER TO ACCESSING ORDER COLLECTION

//Route Imports

module.exports = app;
