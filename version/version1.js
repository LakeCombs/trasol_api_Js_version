const express = require("express");
const ReportRoute = require("../router/reportRoute");
const UserRoute = require("../router/userRoute");
const VehicleRoute = require("../router/vehicleRoute");
const MechanicRoute = require("../router/mechanicRoute");
const RequestForMechRoute = require("../router/requestForMectRoute");
const product_route = require("../router/product.route");
const vendorRoute = require("../router/vendor.route");
const subscription_route = require("../router/subscription.route");

const v1 = express.Router();

v1.get("/", (req, res) => {
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

module.exports = { v1 };
