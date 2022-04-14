const express = require("express");
const ReportRoute = require("../router/reportRoute");
const UserRoute = require("../router/userRoute");
const VehicleRoute = require("../router/vehicleRoute");

const v1 = express.Router();

v1.get("/", (req, res) => {
  res.send("I am the v1");
});

v1.use("/user", UserRoute);
v1.use("/vehicle", VehicleRoute);
v1.use("/report", ReportRoute);

module.exports = { v1 };