const express = require("express");
const protect = require("../middleware/authenticationMiddeware");
const {
  requestMechanic,
  editARequests,
  getAllMechanicRequest,
  mechanicAcceptMechRequest,
  getSingleUserMechRequest,
} = require("../controller/requestForMechController");

const RequestForMechRoute = express.Router();

RequestForMechRoute.get("/", getAllMechanicRequest);
RequestForMechRoute.post("/", protect, requestMechanic);
RequestForMechRoute.put("/user/:id", protect, editARequests);
RequestForMechRoute.get("/user", protect, getSingleUserMechRequest);
RequestForMechRoute.put("/accept", protect, mechanicAcceptMechRequest);

module.exports = RequestForMechRoute;
