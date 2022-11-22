const express = require("express");
const app = express();
const userRouter = require("./routes/user")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRouter)

//Route Imports

module.exports = app;
