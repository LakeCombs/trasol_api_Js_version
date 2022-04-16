const express = require("express");
const protect = require("../middleware/authenticationMiddeware");
const {
  requestMechanic,
  editARequests,
} = require("../controller/requestForMechController");

const RequestForMechRoute = express.Router();

RequestForMechRoute.post("/", protect, requestMechanic);
RequestForMechRoute.put("/:id", protect, editARequests);

module.exports = RequestForMechRoute;
