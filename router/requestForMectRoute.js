const express = require("express");
const protect = require("../middleware/authenticationMiddeware");
const {
	requestMechanic,
	editARequests,
	getAllMechanicRequest,
	mechanicAcceptMechRequest,
	getSingleUserMechRequest,
	getMehanicCompletedRepair,
	getSingleMechRequest,
	mechanicRating,
	mech_start_repairs,
	mech_finish_repair
} = require("../controller/requestForMechController");

const RequestForMechRoute = express.Router();

RequestForMechRoute.get("/", getAllMechanicRequest);
RequestForMechRoute.get("/:id", getSingleMechRequest);
RequestForMechRoute.post(
	"/",
	// protect,
	requestMechanic
);
RequestForMechRoute.get("/completed", getMehanicCompletedRepair);
RequestForMechRoute.put("/user/:id", protect, editARequests);
RequestForMechRoute.get("/user", protect, getSingleUserMechRequest);
RequestForMechRoute.put("/accept/:id", protect, mechanicAcceptMechRequest);
RequestForMechRoute.put("/rate/:id", mechanicRating);
RequestForMechRoute.put("/start/:id", mech_start_repairs);
RequestForMechRoute.put("/finish/:id", mech_finish_repair);

module.exports = RequestForMechRoute;
