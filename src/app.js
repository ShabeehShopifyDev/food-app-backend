const express = require("express");
const app = express();

app.use(express.json());

const authUserRoutes = require("./routes/auth.routes");
app.use("/api/auth", authUserRoutes);

module.exports = app;