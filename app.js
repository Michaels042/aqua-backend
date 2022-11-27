const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/user");

const orderRoutes = require("./routes/order");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send({ status: true, message: "Welcome to aqua locator" });
}); // backend landing route

app.use("/auth", userRouter);
app.use("/user", orderRoutes); // ROUTES FOR USER TO ACCESSING ORDER COLLECTION

app.use("/admin", orderRoutes); // ROUTES FOR ADMIN TO ACCESSING ORDER
app.use("/admin", userRouter); // ROUTES FOR ADMIN TO UPDATE AND DELETE USER
//Route Imports

module.exports = app;
