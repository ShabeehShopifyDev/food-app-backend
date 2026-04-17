const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authUserRoutes = require("./routes/auth.routes");
const foodRouter = require("./routes/food.route");

app.use("/api/auth", authUserRoutes);
app.use("/api/food", foodRouter);

module.exports = app;