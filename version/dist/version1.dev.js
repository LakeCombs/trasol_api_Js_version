"use strict";

var express = require("express");

var ReportRoute = require("../router/reportRoute");

var UserRoute = require("../router/userRoute");

var VehicleRoute = require("../router/vehicleRoute");

var MechanicRoute = require("../router/mechanicRoute");

var RequestForMechRoute = require("../router/requestForMectRoute");

var product_route = require("../router/product.route");

var vendorRoute = require("../router/vendor.route");

var subscription_route = require("../router/subscription.route");

var tow_route = require("../router/Tow.route");

var v1 = express.Router();
v1.get("/", function (req, res) {
  res.send("I am the v1");
});
v1.use("/user", UserRoute);
v1.use("/vehicle", VehicleRoute);
v1.use("/report", ReportRoute);
v1.use("/mechanic", MechanicRoute);
v1.use("/reqmec", RequestForMechRoute);
v1.use("/vendor", vendorRoute);
v1.use("/product", product_route);
v1.use("/subscribe", subscription_route);
v1.use("/tow", tow_route);
module.exports = {
  v1: v1
};